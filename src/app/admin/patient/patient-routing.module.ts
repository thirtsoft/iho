import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { DetailPatientComponent } from './pages/detail-patient/detail-patient.component';

const routes: Routes = [
  {
		path : '',
		component : ListPatientComponent
	},
  {
		path : 'details/:id',
		component : DetailPatientComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
