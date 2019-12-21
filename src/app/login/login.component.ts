import {Component,  OnInit} from '@angular/core';
import {UserRestService} from '../shared/services/user-rest.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  error = false;
  user = {username: '', password: ''};

  constructor(private conex: UserRestService, private  snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login() {
    this.conex.loginUser(this.user.username,this.user.password).subscribe(
      (res: Response) => {
        // @ts-ignore
        sessionStorage.setItem("token", res);
        window.location.reload();
      },
      (res)=> {
        // @ts-ignore
        this.snackBar.open(res.error,"error",{duration:2500});
      });
  }

}
