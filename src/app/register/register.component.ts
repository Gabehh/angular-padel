import { Component, OnInit } from '@angular/core';
import {UserRestService} from '../shared/services/user-rest.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error = false;
  newUser = {username: '', password: '', email: '', birthdate: 0};
  constructor(private conex: UserRestService) { }
  ngOnInit() {
  }
  addUser() {
    this.conex.postUser(this.newUser).subscribe(
      (res:Response) => {

        if(sessionStorage.getItem("token") != null){
          alert("ya está conectado");
        }

        console.log(res);
      },
      (error) => {
        this.error = true;
      });
  }

  checkUser() {
    this.conex.checkUser(this.newUser.username,"").subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        this.error = true;
      });
  }
}
