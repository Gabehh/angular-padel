import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  appearLogin = true;
  constructor(private  snackBar: MatSnackBar, private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    if(sessionStorage.getItem("token")!= null){
      this.appearLogin = false;

      if (Date.now() >= this.jwtHelper.decodeToken(sessionStorage.getItem("token")).exp * 1000) {
        this.logout();
      }

    }
    else{
      this.appearLogin = true;

    }

    let isNewUser = sessionStorage.getItem("isNewUser");
    if(isNewUser != null && isNewUser == "true"){
      this.snackBar.open("Usuario registrado","success",{duration:4000});
      sessionStorage.removeItem("isNewUser");
    }
  }

  logout(){
    sessionStorage.setItem("token","");
    sessionStorage.clear();
    sessionStorage.removeItem("token");
    window.location.reload();
  }
}
