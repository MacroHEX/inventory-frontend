import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MaterialModule} from "../extras/material/material.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

export const APP_PARENT = new InjectionToken<{}>("AppParent");
export const APP_DTO = new InjectionToken<{}>("AppDTO");

@NgModule({
  exports: [],
  declarations: [],
  imports: [
    // extras
    MaterialModule,

    // ng
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    DatePipe,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}, //standard, fill, outline
    {provide: APP_PARENT, useValue: {}},
    {provide: APP_DTO, useValue: {}}
  ],
})
export class BaseModule {
}
