import { Component,Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {PublishProblemService} from '../services/publishProblem.service';
import { EmitterService } from '../services/emmiter.service';

@Component({
    selector: 'publication-container-component',
    templateUrl: 'publication-container.component.html',
    styleUrls: ['publication-container.component.css']
})

export class PublicationContainerComponent implements OnInit, OnChanges{
    constructor(
        private commentService:PublishProblemService
    ){}

    comments:Comment[];
    newcomments:Comment[];
    @Input() publicator: string;
    @Input() publicationText: string;
    @Input() containerMode:number=0;
    @Input() containerFilter: string;
    @Input() accessLevel:number;
    @Input() usrName:string;
    @Input() usrGroup:string;

    loadComments(){
        this.commentService.getProblems()
        .subscribe(
            comments => this.comments = comments,
            err =>{
                console.log(err);
            });
    }

    loadNewComments(){
        this.commentService.getProblems()
        .subscribe(
            comments => this.newcomments = comments,
            err =>{
                console.log(err);
            }
        );
    }

    compareComments(){
        this.loadNewComments();
        if(this.comments!=this.newcomments){
            console.log(2);
        }
    }    

    ngOnInit(){
    this.loadComments();
    }

    ngOnChanges(changes: any) {
        this.loadComments();
        EmitterService.get(this.publicator).subscribe((comments:Comment[]) => {this.comments = comments});
    }

}