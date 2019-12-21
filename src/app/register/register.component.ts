import { Component, OnInit } from '@angular/core';
import {UserRestService} from '../shared/services/user-rest.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error = false;
  newUser = {username: '', password: '', email: '', birthdate: 0};
  constructor(private conex: UserRestService, private  snackBar: MatSnackBar) { }
  ngOnInit() {
  }
  addUser() {
    this.conex.postUser(this.newUser).subscribe(
      (res:Response) => {
        console.log(res);
      },
      (error) => {
        this.error = true;
      });
  }

  checkUser() {
    this.conex.checkUser(this.newUser.username,"").subscribe(
      (res) => {
        this.snackBar.open("El usuario ya existe.","error",{duration:2500});
        this.newUser.username = "";
      });
  }
}
