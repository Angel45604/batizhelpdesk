import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user'


@Injectable()
export class UserService {
     constructor (private http: Http) {}
     private statusurl='http://localhost:3000/api/users';   

     getUsers(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
         return this.http.get(this.statusurl, {headers: headers})
                         .map((res:Response) => res.json())
        
     }  

     addUser (body: Object){
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.statusurl, body, {headers: headers}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    }

    editUser (body){
        let bodyString = JSON.stringify(body);
        console.log(bodyString);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers })

        return this.http.post(this.statusurl, body, {headers: headers})
                        .map(res => res)
    }

    removeUser (user: string){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
        return this.http.delete(`${this.statusurl}/${user}`, {headers: headers}) // ...using put request
                         .map(res => res ) // ...now we return data
    }
}