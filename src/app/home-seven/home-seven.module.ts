import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeSevenRoutingModule } from './home-seven-routing.module';
import { HomeSevenComponent } from './home-seven.component';


@NgModule({
  declarations: [HomeSevenComponent],
  imports: [
    CommonModule,
    HomeSevenRoutingModule
  ]
})
export class HomeSevenModule { }
