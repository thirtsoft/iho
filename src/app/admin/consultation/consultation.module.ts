import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRoutingModule } from './consultation-routing.module';
import { ConsultationComponent } from './consultation.component';
import { CreateConsultationComponent } from './pages/create-consultation/create-consultation.component';
import { DetailConsultationComponent } from './pages/detail-consultation/detail-consultation.component';
import { ConsultationsComponent } from './pages/consultations/consultations.component';


@NgModule({
  declarations: [
    ConsultationComponent,
    CreateConsultationComponent,
    DetailConsultationComponent,
    ConsultationsComponent
  ],
  imports: [
    CommonModule,
    ConsultationRoutingModule
  ]
})
export class ConsultationModule { }
