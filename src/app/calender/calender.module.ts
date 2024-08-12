import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalenderRoutingModule } from './calender-routing.module';
import {RouterModule} from '@angular/router';
import { CalenderComponent } from './calender.component';


@NgModule({
  declarations: [CalenderComponent],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    RouterModule
  ]
})
export class CalenderModule { }
