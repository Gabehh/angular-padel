import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReserveRestService{

  private url = 'http://fenw.etsisi.upm.es:10000/reservations';
  constructor(private http: HttpClient) { }

  getReservations(token: string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Content-Type', 'application/json').set("Authorization",token);
    return this.http.get(this.url, {headers});
  }

  getAllReservations(date, token: string){
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Content-Type', 'application/json').set("Authorization",token);
    return this.http.get(this.url+"/"+date, {headers});
  }

  postReservation(reserva, token: string){
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Content-Type', 'application/json').set("Authorization",token);
    return this.http.post(this.url,reserva, {headers});
  }

}
