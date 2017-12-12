import { Component, Input} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'menu-bar-component',
    templateUrl: 'menu-bar.component.html',
    styleUrls: ['menu-bar.component.css']
})

export class MenubarComponent{
    constructor(private authenticationService:AuthenticationService, private router: Router, public snackBar: MatSnackBar){}
    @Input('header') header: string;
    @Input('username') username: string;
    @Input('color') color: string = 'accent';
    @Input('error') error: boolean = false;
    @Input('isAdmin')isAdmin: boolean = false; 
    
    usrname: string;
    password: string;

    folio: string;

    logOut(){
        this.authenticationService.logout();
        location.reload();
        
    }
    isLogged() {
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
                this.color = 'warn';
                this.error = true;
                console.error(error);
                let snackBarCredentialsError = this.snackBar.open('Credenciales Incorrectas');
                setTimeout( () => {
                    snackBarCredentialsError.dismiss()
                },1500);
            });
    }
    search() {
        console.log(this.folio)
        this.router.navigate(['/home'], {queryParams: {folio: this.folio}});
        location.reload();
    }
}