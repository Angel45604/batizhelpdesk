import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Area } from '../models/area';
import { Problem } from '../models/problem';
import { map } from 'rxjs/operators';

@Injectable()
export class PublishProblemService {
     constructor (private http: Http) {}
     private statusurl = 'http://localhost:3000/api/problems';  

     getProblems(){
         console.log(sessionStorage.getItem('id_token'))
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
         return this.http.get(this.statusurl, {headers: headers})
                         .pipe(map((res:Response) => res.json()))
        
     }

     getProblemByFolio(folio: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
        return this.http.get(this.statusurl+'/'+folio, {headers: headers})
                        .pipe(map((res:Response) => res.json()))
     }

     getProblemsByUser(user) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
         return this.http.get(`${this.statusurl}/username/${user.username}`, {headers: headers})
                         .pipe(map((res:Response) => res.json()))
     }

     getProblemsByArea(area) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
         return this.http.get(`${this.statusurl}/area/${area}`, {headers: headers})
                         .pipe(map((res:Response) => res.json()))
     }

     getProblemsByUserAndArea(username, area) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
         return this.http.get(`${this.statusurl}/${username}/${area}`, {headers: headers})
                         .pipe(map((res:Response) => res.json())).toPromise()
     }

     addProblem (body: Object) {
        let bodyString = JSON.stringify(body); // Stringify payload
        console.log(bodyString)
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.statusurl, bodyString, {headers:headers}) // ...using post request
                         .pipe(map((res:Response) => {return res.json()})) // ...and calling .json() on the response to return data
    }     

    removeProblem (folio: string){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
        return this.http.delete(`${this.statusurl}/folio/${folio}`, {headers: headers}) // ...using put request
                         .pipe(map(res => res )) // ...now we return data
    }
}