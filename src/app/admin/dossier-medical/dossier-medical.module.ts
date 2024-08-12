import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierMedicalRoutingModule } from './dossier-medical-routing.module';
import { DetailDossierMedicalComponent } from './pages/detail-dossier-medical/detail-dossier-medical.component';
import { DossiersMedicalsComponent } from './pages/dossiers-medicals/dossiers-medicals.component';


@NgModule({
  declarations: [
    DetailDossierMedicalComponent,
    DossiersMedicalsComponent
  ],
  imports: [
    CommonModule,
    DossierMedicalRoutingModule
  ]
})
export class DossierMedicalModule { }
