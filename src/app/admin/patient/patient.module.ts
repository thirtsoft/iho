import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientsComponent } from './patients.component';
import { CreatePatientComponent } from './pages/create-patient/create-patient.component';
import { DetailPatientComponent } from './pages/detail-patient/detail-patient.component';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientsComponent,
    CreatePatientComponent,
    DetailPatientComponent,
    ListPatientComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
