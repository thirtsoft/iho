import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeEightRoutingModule } from './home-eight-routing.module';
import { HomeEightComponent } from './home-eight.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [HomeEightComponent],
  imports: [
    CommonModule,
    HomeEightRoutingModule,
    SlickCarouselModule
  ]
})
export class HomeEightModule { }
