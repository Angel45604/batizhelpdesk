import { Component, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable} from 'rxjs/Rx';
import { Http } from '@angular/http';
import { User } from '../models/user';
import { Problem } from '../models/problem';
import { PublishProblemService } from '../services/publishProblem.service';
import { AreaService } from '../services/area.service';
import { EmitterService } from '../services/emmiter.service';
import { Area } from '../models/area';
import { UUID } from 'angular2-uuid';


@Component({
    selector: 'publicator-component',
    templateUrl: 'publicator.component.html',
    styleUrls: ['publicator.component.css'],
    providers: [PublishProblemService]
})

export class PublicatorComponent{
    uuid = UUID.UUID()
    currentUser: User;
    folio: string;
    title: string;
    content: string;
    username: string;
    area: string;
    status: string;
    
    problem: Problem;
    areas= [];
    editing = false;

    @Input()editId:string;
    @Input()listId:string;
    constructor(
        private publishProblemService: PublishProblemService,
        private areaService: AreaService,
        private http: Http
    ){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loadAreas()
    }

    ngOnInit() {
        //this.loadAreas()
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
        let problemOperation: Observable<Area[]>;
        this.problem = new Problem(this.folio, this.title, this.content, this.currentUser.username);
        problemOperation = this.publishProblemService.addProblem(this.problem);

        problemOperation.subscribe(
            comments => {
              EmitterService.get(this.listId).emit(comments);
              this.problem = new Problem('','','','');
              if(this.editing)this.editing = !this.editing;
            },
            err =>{
              console.log(err);
            });
    }


}