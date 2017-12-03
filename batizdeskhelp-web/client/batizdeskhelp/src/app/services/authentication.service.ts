import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post('http://localhost:3000/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful
                let user = response.json();
                console.log(user);
                if (user) {
                    // store user
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage
        localStorage.removeItem('currentUser');
        return this.http.get('http://localhost:3000/logout');
    }
}