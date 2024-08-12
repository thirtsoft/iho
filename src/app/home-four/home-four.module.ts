import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeFourRoutingModule } from './home-four-routing.module';
import { HomeFourComponent } from './home-four.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [HomeFourComponent],
  imports: [
    CommonModule,
    HomeFourRoutingModule,
    SlickCarouselModule
  ]
})
export class HomeFourModule { }
