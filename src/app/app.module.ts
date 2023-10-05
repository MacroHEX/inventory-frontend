import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_DTO, APP_PARENT, BaseModule} from "../base/base.module";
import {MaterialModule} from "../extras/material/material.module";
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // mods

    // base
    BaseModule,

    // extras
    MaterialModule,

    // ng
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}, // standard, fill, outline
    {provide: APP_PARENT, useValue: {}},
    {provide: APP_DTO, useValue: {}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
