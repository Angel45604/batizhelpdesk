import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
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
import { MatSnackBar } from '@angular/material';


@Component({
    selector: 'search-component',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css'],
    providers: [PublishProblemService]
})

export class SearchComponent implements OnChanges, OnInit{

    @Input()editId:string;
    @Input()listId:string;

    @Input('folio')folio:string;
    @Input('color')color:string;

    constructor(
        private publishProblemService: PublishProblemService,
        private http: Http,
        private htppC: HttpClient,
        public snackBar: MatSnackBar
    ){
    }

    searchProblem() {
        console.log(this.folio);
        this.publishProblemService.getProblemByFolio(this.folio)
        .subscribe(
            folio => {
                this.editId = 'false';
                EmitterService.get(this.listId).emit(folio);
                console.log('SUCCESS')
                console.log(JSON.stringify(folio))
                this.color = '';
            },
            err => {
                this.color = 'warn';
                let snackBarNotFound = this.snackBar.open('No se encontraron resultados');
                setTimeout( () => {
                    snackBarNotFound.dismiss()
                },1500);
            }
        )
        
    }

    ngOnChanges() {
        // Listen to the 'edit'emitted event so as populate the model
        // with the event payload
        console.log('SOMETHING HAPENNED')
        EmitterService.get(this.listId).subscribe((folio) => {
            console.log(`Something Hapenned ${folio}`)
            console.log(folio);
        });
    }

    ngOnInit() {
        console.log(`ON SEARCH ${this.folio}`)
        this.searchProblem();
    }

}