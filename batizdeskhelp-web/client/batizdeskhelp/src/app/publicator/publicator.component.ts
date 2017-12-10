import { Component, Input, OnChanges} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable} from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Problem } from '../models/problem';
import { PublishProblemService } from '../services/publishProblem.service';
import { AreaService } from '../services/area.service';
import { EmitterService } from '../services/emmiter.service';
import { Area } from '../models/area';
import { UUID } from 'angular2-uuid';
import { ResponseContentType } from '@angular/http/';

@Component({
    selector: 'publicator-component',
    templateUrl: 'publicator.component.html',
    styleUrls: ['publicator.component.css'],
    providers: [PublishProblemService]
})

export class PublicatorComponent implements OnChanges{
    uuid = UUID.UUID()
    currentUser: User;
    folio: string;
    title: string;
    content: string = '';
    contentValue = this.content.length || 0;
    username: string;
    area: string;
    status: string;
    
    problem: Problem;
    problems: Problem[];
    areas= [];
    editing = false;

    @Input()editId:string;
    @Input()listId:string;
    constructor(
        private publishProblemService: PublishProblemService,
        private areaService: AreaService,
        private http: Http,
        private htppC: HttpClient
    ){
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.loadAreas()
    }

    loadAreas() {
        this.areaService.getAreas()
        .subscribe(
            areas => {
                for(let areat in areas) {
                    this.areas.push({value: areas[areat].area, viewValue: areas[areat].area})
                }
            },
            err => {
                console.log(err)
            }
        );
    }

    submitProblem() {
        console.log(this.area)
        this.folio = this.uuid;
        this.status = '3';
        console.log(this.folio)
        let problemOperation: Observable<Problem[]>;
        this.problem = new Problem(this.folio, this.title, this.content, this.currentUser.username, 'PROGRA');
        problemOperation = this.publishProblemService.addProblem(this.problem);

        problemOperation.subscribe(
            problem => {
                console.log(`PROBLEMS: ${problem}`)
              //EmitterService.get(this.listId).emit(comments);
              this.problem = new Problem('','','','', '');
              EmitterService.get(this.listId).emit(problem)
            },
            err =>{
              console.log(err);
            });
    }
    
    ngOnChanges() {
        EmitterService.get(this.listId).subscribe((problems:Problem) => {
            console.log(`Something happenned ||PUBLICATOR||`)
            console.log(problems);
        })
    }


}