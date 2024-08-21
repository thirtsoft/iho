import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierMedicalRoutingModule } from './dossier-medical-routing.module';
import { DetailDossierMedicalComponent } from './pages/detail-dossier-medical/detail-dossier-medical.component';
import { DossiersMedicalsComponent } from './pages/dossiers-medicals/dossiers-medicals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailDossierMedicalComponent,
    DossiersMedicalsComponent
  ],
  imports: [
    CommonModule,
    DossierMedicalRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DossierMedicalModule { }
