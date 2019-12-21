import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  appearLogin = true;
  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem("token")!= null){
      this.appearLogin = false;
    }
    else{
      this.appearLogin = true;
    }
  }

  logout(){
    sessionStorage.setItem("token","");
    sessionStorage.clear();
    sessionStorage.removeItem("token");
    window.location.reload();
  }
}
