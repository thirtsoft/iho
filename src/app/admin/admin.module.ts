import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService } from './../data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';
import { ListeRendezVousComponent } from './rendezvous/pages/liste-rendez-vous/liste-rendez-vous.component';
import { ConsultationMedicalModule } from './consultation-medical/consultation-medical.module';

@NgModule({
  declarations: [AdminComponent, SidemenuComponent, ListeRendezVousComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    NgSelect2Module,
  //  InMemoryWebApiModule.forRoot(DataService),
    ModalModule.forRoot(),
  ConsultationMedicalModule,
  ],
})
export class AdminModule {}
