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
  //login: LoginComponent;
  userEsquema = {username: '', password: '', repeatPassword :'', email: '', birthdate: ''};
  newUser = {username: '', password: '', email: '', birthdate: 0};
  constructor(private conex: UserRestService, private  snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addUser() {

    if(this.userEsquema.repeatPassword != this.userEsquema.password)
    {
      this.snackBar.open("Las passwords no son iguales","error",{duration:2500});
    }
    else
    {
      this.newUser.username = this.userEsquema.username;
      this.newUser.email = this.userEsquema.email;
      this.newUser.password = this.userEsquema.password;
      this.newUser.birthdate = 0;
      if(this.userEsquema.birthdate != null)
      {
        let number = new Date(this.userEsquema.birthdate).getTime();
        this.newUser.birthdate = number;
      }
      else
      {
        this.newUser.birthdate = 0;
      }
      this.conex.postUser(this.newUser).subscribe(
        (res:Response) => {
          this.login();
        },
        (error) => {
          this.snackBar.open(error.error,"error",{duration:2500});
        });
    }
  }

  checkUser() {
    this.conex.checkUser(this.userEsquema.username,"").subscribe(
      (res) => {
        this.snackBar.open("El usuario ya existe.","error",{duration:2500});
        this.userEsquema.username = "";
      });
  }


  login() {
    this.conex.loginUser(this.newUser.username,this.newUser.password).subscribe(
      (res: Response) => {
        // @ts-ignore
        sessionStorage.setItem("token", res);
        sessionStorage.setItem("isNewUser", "true");
        window.location.reload();
      },
      (res)=> {
        // @ts-ignore
        this.snackBar.open(res.error,"error",{duration:2500});
      });
  }
}
