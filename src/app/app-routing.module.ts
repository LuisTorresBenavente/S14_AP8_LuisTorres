import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fitness',
    pathMatch: 'full'
  },
  {
    path: 'fitness',
    loadChildren: () => import('./features/fitness/fitness.module').then(m => m.FitnessModule)
  },
  {
    path: '**',
    redirectTo: 'fitness'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
