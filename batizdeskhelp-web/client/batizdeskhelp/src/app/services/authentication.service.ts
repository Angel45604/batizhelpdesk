import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {}


    login(username: string, password: string) {      
        return this.http.post('http://localhost:3000/storage/login', { username, password })
            .map((response: Response) => {
                // login successful
                console.log(`response ${response.toString()}`)
                let user = response.json();
                console.log(user);
                if (user) {
                    // store user
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(`localstorage: ${localStorage.getItem('currentUser')}`)
                }else {
                    console.log('Hubo un error')
                }
            })
    }

    logout() {
        // remove user from local storage
        localStorage.removeItem('currentUser');
        return this.http.get('http://localhost:3000/storage/logout');
    }
}