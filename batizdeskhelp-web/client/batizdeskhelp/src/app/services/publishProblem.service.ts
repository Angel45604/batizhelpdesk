import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Area } from '../models/area';
import { Problem } from '../models/problem';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PublishProblemService {
     constructor (private http: Http) {}
     private statusurl = 'http://localhost:3000/api/problems';  

     getProblems() : Observable<Problem[]>{
         return this.http.get(this.statusurl)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }

     addProblem (body: Object) {
        let bodyString = JSON.stringify(body); // Stringify payload
        console.log(bodyString)
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.statusurl, bodyString, options) // ...using post request
                         .map((res:Response) => {return res.json()}) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }     
}