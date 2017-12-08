import { Component, Input} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'menu-bar-component',
    templateUrl: 'menu-bar.component.html',
    styleUrls: ['menu-bar.component.css']
})

export class MenubarComponent{
    constructor(private authenticationService:AuthenticationService){}
    @Input('header') header: string;
    @Input('username') username: string;
     
    usrname: string;
    password: string;

    logOut(){
        this.authenticationService.logout();
        location.reload();
        
    }
    isLogged() {
        console.log(this.authenticationService.isLogged())
        return this.authenticationService.isLogged();
    }

    login() {
        console.log(this.usrname, this.password)
        this.authenticationService.login(this.usrname, this.password)
        .subscribe(
            data => {
                location.reload();
            },
            error => {
                console.error(error);
            });
    }
}