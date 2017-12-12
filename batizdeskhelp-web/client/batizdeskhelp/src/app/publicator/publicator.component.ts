import { Component, Input, OnChanges} from '@angular/core';
import { NgForm, FormControl, FormGroupDirective, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
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
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmited = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmited));
    }
}
@Component({
    selector: 'publicator-component',
    templateUrl: 'publicator.component.html',
    styleUrls: ['publicator.component.css'],
    providers: [PublishProblemService]
})

export class PublicatorComponent implements OnChanges{

    titleFormControl = new FormControl('', [
        Validators.required,
    ]);
  
    descriptionFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
  
    areaFormControl = new FormControl('', [
        Validators.required
        
    ]);

    uuid: any;
    currentUser: User;
    folio: string;
    title: string;
    content: string = '';
    contentValue = this.content.length || 0;
    username: string;
    area: string;
    status: string;
    matcher = new MyErrorStateMatcher();
    
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
        private htppC: HttpClient,
        private formBuilder: FormBuilder
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
        this.uuid = UUID.UUID();
        console.log(this.area)
        this.folio = this.uuid;
        this.status = '3';
        console.log(this.folio)
        let problemOperation: Observable<Problem[]>;
        this.problem = new Problem(this.uuid, this.title, this.content, this.currentUser.username, this.area);
        problemOperation = this.publishProblemService.addProblem(this.problem);

        problemOperation.subscribe(
            problem => {
                console.log(`PROBLEMS: ${problem}`)
              //EmitterService.get(this.listId).emit(comments);
              this.problem = new Problem('','','','', '');
              EmitterService.get(this.listId).emit(problem)
              this.title='';
              this.content=''
              this.area='';
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