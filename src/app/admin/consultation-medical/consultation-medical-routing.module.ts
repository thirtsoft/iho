import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeConsultationComponent } from './pages/liste-consultation/liste-consultation.component';
import { DetailsConsultationComponent } from './pages/details-consultation/details-consultation.component';
import { CreateConsultationComponent } from './pages/create-consultation/create-consultation.component';

const routes: Routes = [
  { path: '', component: ListeConsultationComponent },
  { path: 'create', component: CreateConsultationComponent },
  { path: 'edit/:id', component: CreateConsultationComponent },
  { path: 'details/:id', component: DetailsConsultationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationMedicalRoutingModule { }
