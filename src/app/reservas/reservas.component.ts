import { Component, OnInit } from '@angular/core';
import {ReserveRestService} from '../shared/services/reserve-rest.service';
import {reserve} from '../shared/model/reserve.model';

import {MatSnackBar} from '@angular/material';

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
  countReservations = 0;
  reserva = {pista: 1, date: "", hour: ""};
  newReservation = {courtid: 0,rsvdatetime : 0 };
  displayedColumns: string[] = ['rsvId', 'courtId', 'rsvdateTime', 'rsvday', 'rsvtime'];
  dataSource = ELEMENT_DATA;
  dataSourceWhole = ELEMENT_DATA;
  myReservations: reserve[] = [];

  constructor(private conex: ReserveRestService, private  snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations(){
    this.conex.getReservations(sessionStorage.getItem("token")).subscribe(
      (res:reserve[]) => {
        this.myReservations = res;
        this.dataSource = this.myReservations;
        this.countReservations = res.length;
      },
      (error) => {
        this.snackBar.open(error.error,"error",{duration:7000});
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
        this.snackBar.open(error.error,"error",{duration:7000});
      });
  }

  checkPista(){
    if(this.reserva.pista>4 || this.reserva.pista<1){
      this.snackBar.open("Unicamente existen 4 pistas, debes seleccionar una de las 4!","error",{duration:4500});
      this.reserva.pista = 1;
    }
  }



  postReservation(){
    let date = new Date(this.reserva.date).setHours(Number(this.reserva.hour.split(":")[0]),Number(this.reserva.hour.split(":")[1]));
    if(Number(this.reserva.hour.split(":")[0]) > 20 || Number(this.reserva.hour.split(":")[0])<10 || Number(this.reserva.hour.split(":")[1])!=0){
      this.snackBar.open("La hora de reservas es desde las 10:00 hasta las 20:00 y en hora en punto, ya que a las 23:00 cerramos","error",{duration:7000});
    } else  if(new Date().getTime()>date)
    {
      this.snackBar.open("La fecha de reserva no puede ser anterior a la fecha y hora actual","error",{duration:2500})
    }
    else{
      this.newReservation.rsvdatetime = date;
      this.newReservation.courtid = Number(this.reserva.pista);
      this.conex.postReservation(this.newReservation,sessionStorage.getItem("token")).subscribe(
        (res:reserve[]) => {
          this.myReservations = res;
          this.dataSourceWhole = this.myReservations;
          this.snackBar.open("Reserva realizada.","Success",{duration:5000});
          this.getReservations();
          this.getAllReservations()
        },
        (error) => {
          this.snackBar.open(error.error,"error",{duration:7000});
        });
    }
  }

}
