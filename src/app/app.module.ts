import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainWidgetComponent } from './main-widget/main-widget.component';
import { MainWidgetModule } from './main-widget/main-widget.module';

@NgModule({
  declarations: [
    AppComponent,
    MainWidgetComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MainWidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
