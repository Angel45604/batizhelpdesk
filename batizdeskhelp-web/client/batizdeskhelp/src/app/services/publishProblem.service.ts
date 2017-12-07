import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
<<<<<<< HEAD
=======
import { Area } from '../models/area';
import { Problem } from '../models/problem';
>>>>>>> hotfix

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PublishProblemService {
     constructor (private http: Http) {}
     private commentsmdUrl = 'http://localhost:3000/api/problems';  
     private commentsUrl='http://localhost:3000/api/problems';   

<<<<<<< HEAD
     getProblems() : Observable<Comment[]>{
         return this.http.get(this.commentsUrl)
=======
     getProblems() : Observable<Problem[]>{
         return this.http.get(this.statusurl)
>>>>>>> hotfix
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }

<<<<<<< HEAD
    addProblem2 (body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        console.log(`BODY: ${body} BODYSTR: ${bodyString}`)
=======
     addProblem (body: Object): Observable<Problem[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        console.log(bodyString)
>>>>>>> hotfix
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.commentsUrl, bodyString, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }     

     addComment (body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.commentsmdUrl, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
}