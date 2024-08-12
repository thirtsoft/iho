import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHospitalisationComponent } from './pages/create-hospitalisation/create-hospitalisation.component';
import { DetailHospitalisationComponent } from './pages/detail-hospitalisation/detail-hospitalisation.component';

const routes: Routes = [
  {
    path: '', component: CreateHospitalisationComponent
  },
  {
    path: 'detaail', component: DetailHospitalisationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalisationRoutingModule { }
