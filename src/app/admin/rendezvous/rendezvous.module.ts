import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RendezvousRoutingModule } from './rendezvous-routing.module';
import { CreateRendezVousComponent } from './pages/create-rendez-vous/create-rendez-vous.component';
import { MesRendezVousComponent } from './pages/mes-rendez-vous/mes-rendez-vous.component';
import { RendezVousJourComponent } from './pages/rendez-vous-jour/rendez-vous-jour.component';


@NgModule({
  declarations: [
    CreateRendezVousComponent,
    MesRendezVousComponent,
    RendezVousJourComponent
  ],
  imports: [
    CommonModule,
    RendezvousRoutingModule
  ]
})
export class RendezvousModule { }
