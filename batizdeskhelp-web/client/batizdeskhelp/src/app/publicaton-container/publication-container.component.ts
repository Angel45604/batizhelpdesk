import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PublishProblemService } from '../services/publishProblem.service';
import { Problem } from '../models/problem';
import { User } from '../models/user';
import { EmitterService } from '../services/emmiter.service';

@Component({
    selector: 'publication-container-component',
    templateUrl: 'publication-container.component.html',
    styleUrls: ['publication-container.component.css']
})

export class PublicationContainerComponent implements OnInit, OnChanges{
    constructor(private problemService: PublishProblemService){}
    problems:Problem[];
    newproblems:Problem[];
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    loadProblems() {
        this.problemService.getProblems()
        .subscribe(
            problems => {
                this.problems = problems
                console.log(problems);
            },
            err =>{
                console.log(err);
            });
    }

    ngOnInit(){
        this.loadProblems();
        }
    
        ngOnChanges(changes: any) {
            this.loadProblems();
            EmitterService.get(this.currentUser.username).subscribe((problems:Problem[]) => {this.problems = problems});
        }
}