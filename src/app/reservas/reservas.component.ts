import { Component, OnInit } from '@angular/core';
import {ReserveRestService} from '../shared/services/reserve-rest.service';
import {reserve} from '../shared/model/reserve.model';

export interface PeriodicElement {
  pista: string;
  id: number;
  fecha: string;
  hora: string;

}
const ELEMENT_DATA: reserve[] = [
];

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reserva = {pista: "", date: "", hour: ""};
  displayedColumns: string[] = ['rsvId', 'courtId', 'rsvdateTime', 'rsvday', 'rsvtime'];
  dataSource = ELEMENT_DATA;
  dataSourceWhole = ELEMENT_DATA;
  myReservations: reserve[] = [];

  constructor(private conex: ReserveRestService) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations(){
    this.conex.getReservations(sessionStorage.getItem("token")).subscribe(
      (res:reserve[]) => {
        this.myReservations = res;
        this.dataSource = this.myReservations;
      },
      (error) => {
        alert(error);
      });
  }
  getAllReservations(){
    let date = new Date(this.reserva.date).getTime();
    this.conex.getAllReservations(date,sessionStorage.getItem("token")).subscribe(
      (res:reserve[]) => {
        this.myReservations = res;
        this.dataSourceWhole = this.myReservations;
      },
      (error) => {
        alert(error);
      });

  }

}
