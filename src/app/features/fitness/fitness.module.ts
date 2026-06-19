import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FitnessRoutingModule } from './fitness-routing.module';

// Componentes
import { InicioComponent } from './components/inicio/inicio.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { PlanesComponent } from './components/planes/planes.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EncargadoComponent } from './components/encargado/encargado.component';
import { LoginComponent } from './components/login/login.component';

// Servicios
import { FitnessService } from './services/fitness.service';

@NgModule({
  declarations: [
    InicioComponent,
    RutinasComponent,
    PlanesComponent,
    ContactoComponent,
    EncargadoComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FitnessRoutingModule
  ],
  providers: [
    FitnessService
  ]
})
export class FitnessModule { }
