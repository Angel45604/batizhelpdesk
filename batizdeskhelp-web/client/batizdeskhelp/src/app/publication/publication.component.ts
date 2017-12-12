import { Component, Input, OnChanges } from '@angular/core';
import { EmitterService } from '../services/emmiter.service';
import { StatusService } from '../services/status.service';
import { PublishProblemService } from '../services/publishProblem.service';
import { MatSnackBar } from '@angular/material';
@Component({
    selector: 'publication-component',
    templateUrl: 'publication.component.html',
    styleUrls: ['publication.component.css']
})

export class PublicationComponent implements OnChanges{

    constructor(private statusService: StatusService, private publishProblemService: PublishProblemService, public snackBar: MatSnackBar){}

    header="Publication";
    admin="false";
    count: number = 0;

    @Input('status')status:string;
    @Input('username')username:string;
    @Input('title')title:string;
    @Input('content')content:string;
    @Input('area')area:string;
    @Input('folio')folio:string;
    @Input('date')date:Date;
    @Input('listId')listId: string;
    @Input('isVisible')isVisible:boolean = false;
    @Input('isAdmin')isAdmin:boolean;
    confirm = 'Eliminar';

    checkProblem() {
        this.publishProblemService.addProblem({folio: this.folio, title: this.title, content: this.content, username: this.username, area: this.area, status: true})
                                    .subscribe(problem => {
                                        console.log(problem);
                                        console.log(`CHECKED SUCCESSFULLY`);
                                        let snackBarCheck = this.snackBar.open('Entrada checkeada con éxito');
                                        setTimeout( () => {
                                            snackBarCheck.dismiss()
                                        },1500);
                                    },
                                    err => console.error(err))

    }

    deleteProblem() {
        this.count++;
        this.confirm = 'Confirmar';
        if(this.count >1) {
            console.log(`VOYAELIMINAR`)
            this.publishProblemService.removeProblem(this.folio).subscribe(problem => {
                console.log(problem);
                this.count=0;
                this.confirm = '';
                let snackBarConfirm = this.snackBar.open('Entrada eliminada con éxito');
                setTimeout( () => {
                    snackBarConfirm.dismiss()
                },1500);
            },
            err => console.error(err))
        }
    }

    ngOnChanges(changes:any) {
        EmitterService.get(this.listId).subscribe((folio) => {
            console.log(`SOMETHING JAPENED`);
            console.log(folio);
            if(folio.status) {
                this.status = '1';
            }else {
                this.status = this.statusService.checkStatus(new Date(folio.createdAt));
            }
            this.username = folio.username;
            this.title = folio.title;
            this.content = folio.content;
            this.area = folio.area;
            this.folio = folio.folio;
            this.isVisible = true;
        });
    }

}