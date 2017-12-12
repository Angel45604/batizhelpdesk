import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  constructor(private authenticationService: AuthenticationService) {}

  listId = 'STPROBLEMSTEST';
  problemContainerListId = 'STPROBLEM_CONTAINER_LIST_ID'
  isAdmin: boolean = false;
  currentUser;

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.isAdmin = this.currentUser.admin;
  }

}
