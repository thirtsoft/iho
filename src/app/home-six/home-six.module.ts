import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeSixRoutingModule } from './home-six-routing.module';
import { HomeSixComponent } from './home-six.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [HomeSixComponent],
  imports: [
    CommonModule,
    HomeSixRoutingModule,
    CarouselModule
  ]
})
export class HomeSixModule { }
