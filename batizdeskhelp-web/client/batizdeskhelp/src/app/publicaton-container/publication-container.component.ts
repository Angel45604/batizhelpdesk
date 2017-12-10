import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PublishProblemService } from '../services/publishProblem.service';
import { Problem } from '../models/problem';
import { User } from '../models/user';
import { EmitterService } from '../services/emmiter.service';
import { StatusService } from '../services/status.service';

@Component({
    selector: 'publication-container-component',
    templateUrl: 'publication-container.component.html',
    styleUrls: ['publication-container.component.css']
})

export class PublicationContainerComponent implements OnInit, OnChanges{
    constructor(private problemService: PublishProblemService, private statusService: StatusService){}

    @Input('listId')listId:string;

    problems:Problem[];
    problem: any;
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    isVisible = true;
    loadProblems() {
        this.problemService.getProblems()
        .subscribe(
            problems => {
                this.checkStatus(problems[0])

                this.problems = problems
                console.log(problems);
            },
            err =>{
                console.log(err);
            });
    }

    checkStatus(problem) {
        let date = new Date(problem.createdAt);
        console.log(`DATE INMILIS: ${date.getTime()}`);
        console.log(this.statusService.checkStatus(date));
        return this.statusService.checkStatus(date);
    }

    ngOnInit(){
        this.loadProblems();
        }
    
        ngOnChanges(changes: any) {
            
            EmitterService.get(this.listId).subscribe((problems:Problem[]) => {this.loadProblems();});
        }
}