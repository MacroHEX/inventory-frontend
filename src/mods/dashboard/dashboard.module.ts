import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {BaseModule} from "../../base/base.module";
import {MaterialModule} from "../../extras/material/material.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardHomePanelComponent} from './panels/dashboard-home-panel/dashboard-home-panel.component';
import {DashboardPanelComponent} from './panels/dashboard-panel/dashboard-panel.component';


@NgModule({
  declarations: [
    DashboardPanelComponent,
    DashboardHomePanelComponent,
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
    CommonModule
  ],
  providers: [
    DatePipe,
  ],
})

export class DashboardModule {
}
