import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { PlanesComponent } from './components/planes/planes.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EncargadoComponent } from './components/encargado/encargado.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'rutinas',
    component: RutinasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'planes',
    component: PlanesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'contacto',
    component: ContactoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'encargado',
    component: EncargadoComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitnessRoutingModule { }
