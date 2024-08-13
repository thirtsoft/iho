import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilsComponent } from './profils.component';
import { CreateProfilComponent } from './pages/create-profil/create-profil.component';
import { ListProfilComponent } from './pages/list-profil/list-profil.component';
import { ListActionComponent } from './pages/list-action/list-action.component';
import { CreateActionComponent } from './pages/create-action/create-action.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilsComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'create', component: CreateProfilComponent },
      { path: 'all', component: ListProfilComponent },
      { path: 'actions', component: ListActionComponent },
      { path: 'action', component: CreateActionComponent }
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
