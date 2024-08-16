import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { DetailPatientComponent } from './pages/detail-patient/detail-patient.component';
import { CreatePatientComponent } from './pages/create-patient/create-patient.component';

const routes: Routes = [
  {
		path : '',
		component : ListPatientComponent
	},
	{

		path: 'create',
		component : CreatePatientComponent,
	},
	{

		path: 'edit/:id',
		component : CreatePatientComponent,
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
