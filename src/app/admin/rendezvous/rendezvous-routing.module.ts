import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRendezVousComponent } from './pages/create-rendez-vous/create-rendez-vous.component';
import { ListeRendezVousComponent } from './pages/liste-rendez-vous/liste-rendez-vous.component';
import { MesRendezVousComponent } from './pages/mes-rendez-vous/mes-rendez-vous.component';

const routes: Routes = [
  {
    path: 'create', component: CreateRendezVousComponent
  },
  {
    path: 'edit/:id', component: CreateRendezVousComponent
  },
  {
    path: '', component: ListeRendezVousComponent
  },
  {
    path: 'details/:id', component: CreateRendezVousComponent
  },
  {
    path: 'mes-rendez-vous', component: MesRendezVousComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendezvousRoutingModule { }
