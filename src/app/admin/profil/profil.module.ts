import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilsComponent } from './profils.component';
import { CreateProfilComponent } from './pages/create-profil/create-profil.component';
import { CreateActionComponent } from './pages/create-action/create-action.component';
import { ListActionComponent } from './pages/list-action/list-action.component';
import { ListProfilComponent } from './pages/list-profil/list-profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ProfilsComponent,
    CreateProfilComponent,
    CreateActionComponent,
    ListActionComponent,
    ListProfilComponent
  ],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class ProfilModule { }
