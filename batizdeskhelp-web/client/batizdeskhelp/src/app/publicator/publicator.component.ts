import { Component, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable} from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
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
        private http: HttpClient
    ){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

    submitProblem(){
        console.log(this.title,this.content, this.area);
        
        let commentOperation: Observable<Comment[]>;
        const formData: any = new FormData();
        
          if(!this.editing){
              this.problem = new Problem(this.folio,this.title, this.content, this.currentUser.username, 'Area');
              console.log(JSON.stringify(this.problem))
              commentOperation = this.publishProblemService.addProblem2(this.problem);
            }

    
        commentOperation.subscribe(
          comments => {
            EmitterService.get(this.listId).emit(comments);
            this.problem = new Problem('','','','','');
            if(this.editing)this.editing = !this.editing;
          },
          err =>{
            console.log(err);
          });
      }


}