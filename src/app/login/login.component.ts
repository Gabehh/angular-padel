import { Component, OnInit } from '@angular/core';
import {UserRestService} from '../shared/services/user-rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  error = false;
  user = {username: '', password: ''};
  constructor(private conex: UserRestService) { }

  ngOnInit() {
  }

  login() {
    this.conex.loginUser(this.user.username,this.user.password).subscribe(
      (res: Response) => {
        // @ts-ignore
        sessionStorage.setItem("token", res)
      },
      (error) => {
        this.error = true;
      });
  }

  checkUser() {
    this.conex.checkUser(this.user.username,"").subscribe(
      (res) => {
        alert(res);
      },
      (error) => {
        this.error = true;
      });
  }

}
