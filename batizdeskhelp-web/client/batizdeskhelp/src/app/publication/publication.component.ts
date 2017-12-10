import { Component, Input, OnChanges } from '@angular/core';
import { EmitterService } from '../services/emmiter.service';
import { StatusService } from '../services/status.service';
@Component({
    selector: 'publication-component',
    templateUrl: 'publication.component.html',
    styleUrls: ['publication.component.css']
})

export class PublicationComponent implements OnChanges{

    constructor(private statusService: StatusService){}

    header="Publication";
    admin="false";

    @Input('status')status:number;
    @Input('username')username:string;
    @Input('title')title:string;
    @Input('content')content:string;
    @Input('area')area:string;
    @Input('folio')folio:string;
    @Input('date')date:Date;
    @Input('listId')listId: string;
    @Input('isVisible')isVisible:boolean = false;

    ngOnChanges(changes:any) {
        EmitterService.get(this.listId).subscribe((folio) => {
            console.log(`SOMETHING JAPENED`);
            console.log(folio);
            this.status = folio.status;
            this.username = folio.username;
            this.title = folio.title;
            this.content = folio.content;
            this.area = folio.area;
            this.folio = folio.folio;
            this.isVisible = true;
        });
    }

}