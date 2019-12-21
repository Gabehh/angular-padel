import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    RegisterComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [UserRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
