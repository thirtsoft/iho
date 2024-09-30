import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { FirstLoginComponent } from './first-login/first-login.component';

const routes: Routes = [
	{
		path : '',
		component : LoginComponent
	},
	{
		path : 'first-time/:token',
		component: FirstLoginComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
