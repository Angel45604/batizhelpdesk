import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {}

  folio;
  listId = 'PROBLEMSTEST';
  problemContainerListId = 'PROBLEM_CONTAINER_LIST_ID'
  isAdmin: boolean;
  currentUser;

  ngOnInit() {
    console.log(`Params ${this.route.snapshot.queryParams['folio']}`);
    this.folio = this.route.snapshot.queryParams['folio'] || null;
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.isAdmin = this.currentUser.admin;
  }
}
