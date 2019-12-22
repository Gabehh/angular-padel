import { Component, OnInit } from '@angular/core';
import {ReserveRestService} from '../shared/services/reserve-rest.service';
import {reserve} from '../shared/model/reserve.model';
import {SelectionModel} from '@angular/cdk/collections';

import {MatSnackBar} from '@angular/material';

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

  selection = new SelectionModel<reserve>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: reserve): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.rsvId + 1}`;
  }


  getReservations(){
    this.conex.getReservations(sessionStorage.getItem("token")).subscribe(
      (res) => {
        let token = res.headers.get("Authorization");
        sessionStorage.setItem("token",token);
        let body = res.body;
        this.myReservations = <reserve[]>body;
        this.dataSource = this.myReservations;
        this.countReservations = this.myReservations.length;
      },
      (error) => {
        this.snackBar.open(error.error,"error",{duration:7000});
      });
  }
  getAllReservations(){
    let date = new Date(this.reserva.date).getTime();
    this.conex.getAllReservations(date,sessionStorage.getItem("token")).subscribe(
      (res) => {
        let token = res.headers.get("Authorization");
        sessionStorage.setItem("token",token);
        let body = res.body;
        this.myReservations = <reserve[]>body;
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
        (res) => {
          let token = res.headers.get("Authorization");
          if(token!=null){
            sessionStorage.setItem("token",token);
          }
          let body = res.body;
          this.myReservations = <reserve[]>body;
          this.dataSourceWhole = this.myReservations;
          this.snackBar.open("Reserva realizada.","Success",{duration:5000});
          this.getReservations();
          this.getAllReservations();
        },
        (error) => {
          this.snackBar.open(error.error,"error",{duration:7000});
        });
    }
  }

}
