import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {MenubarComponent} from '../menu-bar/menu-bar.component';

import { AuthenticationService } from '../services/authentication.service';

interface Credentials {
    username: string,
    password: string
}

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls:["login.component.css"]
})

export class LoginComponent implements OnInit {
    credentials: Credentials
    username: string;
    password: string;
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    logino() {
        console.log(this.username +" " + this.password);
        this.loading = true;
        this.authenticationService.login(this.username, this.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }
}
