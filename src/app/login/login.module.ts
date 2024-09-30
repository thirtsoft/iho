import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FirstLoginComponent } from './first-login/first-login.component';


@NgModule({
  declarations: [LoginComponent, FirstLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
