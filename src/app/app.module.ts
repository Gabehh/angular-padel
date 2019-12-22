import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { IniciarComponent } from './menu/iniciar/iniciar.component';
import { SalirComponent } from './menu/salir/salir.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserRestService} from './shared/services/user-rest.service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import { ReservasComponent } from './reservas/reservas.component';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    IniciarComponent,
    SalirComponent,
    IndexComponent,
    FooterComponent,
    InstalacionesComponent,
    ServiciosComponent,
    RegisterComponent,
    LoginComponent,
    ReservasComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule, MatTableModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["example.com"],
        blacklistedRoutes: ["example.com/examplebadroute/"]
      }
    })
  ],
  providers: [UserRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
