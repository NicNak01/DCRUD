import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { CarNumberPlate } from './shared/car-number-plate.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    CarNumberPlate
  ],
  exports: [
    HeaderComponent,
    BodyComponent,
    CarNumberPlate ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

})
export class MainWidgetModule { }
