import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {}


    login(credentials) {      
        return this.http.post('http://localhost:3000/storage/login', { credentials })
            .map((response: Response) => {
                // login successful
                let user = response.json();
                console.log(user);
                if (user) {
                    // store user
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            })
            .subscribe(
                // We're assuming the response will be an object
                // with the JWT on an id_token key
                data => localStorage.setItem('id_token', data.id_token),
                error => console.log(error)
            );
    }

    logout() {
        // remove user from local storage
        localStorage.removeItem('currentUser');
        return this.http.get('http://localhost:3000/storage/logout');
    }
}