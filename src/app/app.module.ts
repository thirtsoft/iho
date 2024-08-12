import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgSelect2Module } from 'ng-select2';
import { NgApexchartsModule } from "ng-apexcharts";
import { Home8headerComponent } from './common/home8header/home8header.component';
import { Home8footerComponent } from './common/home8footer/home8footer.component';
import { Home1headerComponent } from './common/home1header/home1header.component';
import { Home1footerComponent } from './common/home1footer/home1footer.component';
import { Home4headerComponent } from './common/home4header/home4header.component';
import { Home4footerComponent } from './common/home4footer/home4footer.component';
import { Home6headerComponent } from './common/home6header/home6header.component';
import { Home6footerComponent } from './common/home6footer/home6footer.component';
import { Home7headerComponent } from './common/home7header/home7header.component';
import { Home7footerComponent } from './common/home7footer/home7footer.component';


@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, Home8headerComponent, Home8footerComponent, Home1headerComponent, Home1footerComponent, Home4headerComponent, Home4footerComponent, Home6headerComponent, Home6footerComponent, Home7headerComponent, Home7footerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule,
    ToastrModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    Daterangepicker,
    NgSelect2Module,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
