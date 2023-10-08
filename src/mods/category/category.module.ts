import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseModule} from "../../base/base.module";
import {MaterialModule} from "../../extras/material/material.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import { CategoryPanelComponent } from './panels/category-panel/category-panel.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryDialogManagerComponent } from './dialogs/category-dialog-manager/category-dialog-manager.component';



@NgModule({
  declarations: [
    CategoryPanelComponent,
    CategoryListComponent,
    CategoryDialogManagerComponent
  ],
  imports: [
    //
    BaseModule,

    // extras
    MaterialModule,

    // ng
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    RouterOutlet,
  ]
})
export class CategoryModule { }
