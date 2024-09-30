import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationMedicalRoutingModule } from './consultation-medical-routing.module';
import { ConsultationMedicalComponent } from './consultation-medical.component';
import { ListeConsultationComponent } from './pages/liste-consultation/liste-consultation.component';
import { CreateConsultationComponent } from './pages/create-consultation/create-consultation.component';
import { DetailsConsultationComponent } from './pages/details-consultation/details-consultation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    ConsultationMedicalComponent,
    ListeConsultationComponent,
    CreateConsultationComponent,
    DetailsConsultationComponent
  ],
  imports: [
    CommonModule,
    ConsultationMedicalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ConsultationMedicalModule { }
