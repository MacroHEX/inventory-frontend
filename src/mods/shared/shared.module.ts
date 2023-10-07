import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {BaseModule} from "../../base/base.module";
import {MaterialModule} from "../../extras/material/material.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterLink, RouterOutlet} from "@angular/router";


@NgModule({
  declarations: [
    SidenavComponent
  ],
  exports: [
    SidenavComponent,
  ],
  imports: [//
    BaseModule,

    // extras
    MaterialModule,

    // ng
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  providers: [
    DatePipe,
  ],
})
export class SharedModule {
}
