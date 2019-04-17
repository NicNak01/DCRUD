import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainWidgetComponent } from './main-widget/main-widget.component';
import { HeaderComponent } from './main-widget/header/header.component';
import { BodyComponent } from './main-widget/body/body.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarNumberPlate } from './main-widget/shared/car-number-plate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainWidgetComponent,
    HeaderComponent,
    BodyComponent,
    CarNumberPlate
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
