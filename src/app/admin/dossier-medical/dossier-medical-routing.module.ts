import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DossiersMedicalsComponent } from './pages/dossiers-medicals/dossiers-medicals.component';
import { DetailDossierMedicalComponent } from './pages/detail-dossier-medical/detail-dossier-medical.component';

const routes: Routes = [
  {
    path: '',
    component: DossiersMedicalsComponent
  },
  {
    path:'details/:id',
    component: DetailDossierMedicalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierMedicalRoutingModule { }
