import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHospitalisationComponent } from './pages/create-hospitalisation/create-hospitalisation.component';
import { DetailHospitalisationComponent } from './pages/detail-hospitalisation/detail-hospitalisation.component';
import { HospitalisationsComponent } from './pages/hospitalisations/hospitalisations.component';

const routes: Routes = [
  {
    path: 'create', component: CreateHospitalisationComponent
  },
  {
    path: 'edit/:id', component: CreateHospitalisationComponent
  },
  {
    path: '', component: HospitalisationsComponent
  },
  {
    path: 'details/:id', component: DetailHospitalisationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalisationRoutingModule { }
