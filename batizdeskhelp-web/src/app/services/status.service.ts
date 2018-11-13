import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { Problem } from '../models/problem'
import { ConfigService } from './config.service';

@Injectable()
export class StatusService {
     constructor (private config: ConfigService) {}
     private currentDate : number;

     checkStatus(date:any) {
         console.log(date);
         this.currentDate = Date.now();
        let milisPassed = this.currentDate - date.getTime();
        let daysPassed = (((milisPassed / 1000) / 60) / 60) / 24;
        //console.log(`DAYS: ${daysPassed}`);
        if(daysPassed > this.config.getGreen()) {
            if(daysPassed > this.config.getOrange()) {
                return 'Red';
            } else {
                return 'Orange';
            }
        } else {
            return 'Green';
        }
     }  
}