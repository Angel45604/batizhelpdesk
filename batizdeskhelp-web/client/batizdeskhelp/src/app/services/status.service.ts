import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Problem } from '../models/problem'
import { ConfigService } from './config.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StatusService {
     constructor (private config: ConfigService) {}
     private currentDate : number;

     checkStatus(date:any) {
         this.currentDate = Date.now();
        let milisPassed = this.currentDate - date.getTime();
        let daysPassed = (((milisPassed / 1000) / 60) / 60) / 24;
        
        if(daysPassed > this.config.daystoGreen) {
            
            if(daysPassed > this.config.daystoOrange) {
                return 'Red';
            } else {
                return 'Orange';
            }
        } else {
            return 'Green';
        }
     }  
}