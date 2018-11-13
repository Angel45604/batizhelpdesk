import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import { User } from '../models/user';
import { ErrorStateMatcher } from '@angular/material';
import { MatSnackBar } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmited = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmited));
    }
}

@Component({
  selector: 'user-component',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit, OnChanges {
  
  constructor(private userService: UserService, private formBuilder: FormBuilder, public snackBar: MatSnackBar) {
  }

  color = 'primary';
  users: User[];
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  edtusername: string;
  edtpassword: string;
  edtconfirmPassword: string;
  edtemail: string;
  id: number;
  isDeleting : boolean;
  matcher = new MyErrorStateMatcher();
  coincidence: boolean;
  usersHTML:Array<any> = new Array;
  i: number;

  usernameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(5)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  confirmPasswordFormControl = new FormControl('', [
      Validators.required
      
  ]);

  passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
  ])


  edtusernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
]);

edtemailFormControl = new FormControl('', [
  Validators.required,
  Validators.email,
]);

edtconfirmPasswordFormControl = new FormControl('', [
    Validators.required
    
]);

edtpasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
])
  

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      let __this = this;
      this.users = users;
      for(let user of this.users) {
        this.usersHTML.push({userId: user.email, userHTML: false});
      }
      console.log(this.usersHTML);
      console.log(this.users);
    },
    err => {
      console.error(err);
    })
  }

  addUser() {
      if (this.password != this.confirmPassword) {
          this.color = 'warn';
          this.confirmPasswordFormControl.setErrors({'invalid':true});
          return
      }
        console.log(this.username)
        let user = {username: this.username, password: this.password, email: this.email};
        let userOperation;
        userOperation = this.userService.addUser(user);
    
        userOperation.subscribe(
            user => {
                console.log(`User: ${user}`);
              //EmitterService.get(this.listId).emit(comments);
              this.loadUsers();
              this.username = '';
              this.password = '';
              this.confirmPassword = '';
              this.email = '';
              let snackBarAddUser = this.snackBar.open('Usuario creado exitosamente');
              setTimeout( () => {
                snackBarAddUser.dismiss()
              },1500);
            },
            err =>{
              console.log(err);
            });
  }

  toggleEdit(user) {
    for(let usert in this.usersHTML) {
      if(this.usersHTML[usert].userId == user.email) {
        this.usersHTML[usert].userHTML = false;
        this.i=parseInt(usert);
        console.log(this.usersHTML[usert]);
      }
    }
    this.edtusername = '';
    this.edtemail = '';
    this.edtpassword = '';
    this.edtconfirmPassword = '';
  }
  editUser(user) {
    for(let usert in this.usersHTML) {
      if(this.usersHTML[usert].userId == user.email) {
        this.usersHTML[usert].userHTML = true;
        this.i=parseInt(usert);
        console.log(this.usersHTML[usert]);
      }
    }
    this.edtusername = user.username;
    this.edtemail = user.email;
  }

  editUserConfirm() {
    let userbody = {username: this.edtusername, password: this.edtpassword, email: this.edtemail};
    let userOperation = this.userService.addUser(userbody)
    
    userOperation.subscribe(
      user => {
        console.log(`User: ${user}`);
        this.loadUsers();
        this.edtusername = '';
        this.edtpassword = '';
        this.edtconfirmPassword = '';
        this.edtemail = '';
        this.usersHTML[this.i].userHTML=false;
        let snackBarUpdateUser = this.snackBar.open('Usuario Actualizado exitosamente');
        setTimeout( () => {
          snackBarUpdateUser.dismiss()
        },1500);
      }
    )
  }

  searchUser(user) {
    for(let usert in this.usersHTML) {
      if(this.usersHTML[usert].userId == user.email) {
        return usert;
      }
    }
  }

  removeUser(user) {
    this.userService.removeUser(user.email).subscribe(res => {
      console.log(res)
      this.loadUsers()
      let snackBarRemoveUser = this.snackBar.open('Usuario Eliminado exitosamente');
      setTimeout( () => {
        snackBarRemoveUser.dismiss()
      },1500);
    }, 
    err =>console.error(err));
    console.log(user);
  }

  confirmDelete(user) {
    console.log(user);
  }

  form: FormGroup;
  get cpwd() {
   return this.form.get('confirmPasswordFormControl');
  }

  ngOnInit() {
    this.loadUsers()
    this.coincidence = true;
  }

  ngOnChanges() {
    console.log(`ALGOESTACAMBIANDO`)
  }
    
}
