import { Component, OnInit, OnChanges } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { EmitterService } from './services/emmiter.service';
import { StatusService } from './services/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  currentUser: User;
  username: string;
  area='PROGRAMACION';
  title='TITULAZO';
  content='CONTENIDAZO';
  isLogged: boolean;
  
  listId = 'PROBLEMSTEST';
  problemContainerListId = 'PROBLEM_CONTAINER_LIST_ID'
  constructor(private authService: AuthenticationService, private statusService: StatusService) {}

  ngOnInit() {
    this.isLogged = this.authService.isLogged();
    if(this.isLogged){
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      console.log(this.currentUser)
      this.username = this.currentUser.username;
    }
  }

  ngOnChanges() {
    // Listen to the 'edit'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.listId).subscribe((folio) => {
        console.log(`Something Hapenned`)
    });
}
  



}
