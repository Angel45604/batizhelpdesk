import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Area } from '../models/area'
import { map } from 'rxjs/operators';


@Injectable()
export class AreaService {
     constructor (private http: Http) {}
     private statusurl='http://localhost:3000/api/area';   

     getAreas(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
         return this.http.get(this.statusurl, {headers: headers})
                         .pipe(map((res:Response) => res.json()))
        
     }  

     addArea (body: Object){
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.statusurl, body, {headers: headers}) // ...using post request
                         .pipe(map((res:Response) => res.json())) // ...and calling .json() on the response to return data
    }

    removeArea (area: string){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
        return this.http.delete(`${this.statusurl}/${area}`, {headers: headers}) // ...using put request
                         .pipe(map(res => res )) // ...now we return data
    }
}