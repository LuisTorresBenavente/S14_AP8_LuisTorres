import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { PlanesComponent } from './components/planes/planes.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'rutinas',
    component: RutinasComponent
  },
  {
    path: 'planes',
    component: PlanesComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitnessRoutingModule { }
