import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalisationRoutingModule } from './hospitalisation-routing.module';
import { CreateHospitalisationComponent } from './pages/create-hospitalisation/create-hospitalisation.component';
import { DetailHospitalisationComponent } from './pages/detail-hospitalisation/detail-hospitalisation.component';
import { HospitalisationsComponent } from './pages/hospitalisations/hospitalisations.component';
import { HospitalisationComponent } from './hospitalisation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularTagsInputModule } from '@iomechs/angular-tags-input';
import { TransfereHospitalisationComponent } from './components/transfere-hospitalisation/transfere-hospitalisation.component';
import { CloturerHospitalisationComponent } from './components/cloturer-hospitalisation/cloturer-hospitalisation.component';


@NgModule({
  declarations: [
    HospitalisationComponent,
    CreateHospitalisationComponent,
    DetailHospitalisationComponent,
    HospitalisationsComponent,
    TransfereHospitalisationComponent,
    CloturerHospitalisationComponent
  ],
  imports: [
    CommonModule,
    HospitalisationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    AngularTagsInputModule,
  ]
})
export class HospitalisationModule { }
