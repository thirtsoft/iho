import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';

import { PatientsComponent } from './patients.component';
// import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [PatientsComponent],
  imports: [CommonModule, PatientsRoutingModule, NgbModule,NgSelect2Module],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientsModule {}
