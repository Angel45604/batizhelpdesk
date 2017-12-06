import { Component, Input} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'menu-bar-component',
    templateUrl: 'menu-bar.component.html',
    styleUrls: ['menu-bar.component.css']
})

export class MenubarComponent{
    constructor(private authenticationService:AuthenticationService){}
    @Input('header') header: string;
    @Input('username') username: string;
    logOut(){
        this.authenticationService.logout();
        location.reload();
        
    }
}