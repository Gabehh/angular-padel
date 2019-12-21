import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserRestService {

  private url = 'http://fenw.etsisi.upm.es:10000/users';
  constructor(private http: HttpClient) { }

  postUser(user) {
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url , user, {headers});
  }

  checkUser(name : string, token: string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url+"/"+name, {headers});
  }

  loginUser(user : string, password: string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url+"/login?username="+user+"&password="+password, {headers});
  }

}
