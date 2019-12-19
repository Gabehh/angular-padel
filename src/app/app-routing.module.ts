import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {InicioComponent} from './inicio/inicio.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { ServiciosComponent } from './servicios/servicios.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'instalaciones', component: InstalacionesComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
