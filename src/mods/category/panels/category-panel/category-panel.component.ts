import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AppService} from "../../../../app/services/app.service";
import {CategoryListComponent} from "../../components/category-list/category-list.component";
import {APP_DTO} from "../../../../base/base.module";
import {CategoryDialogManagerComponent} from "../../dialogs/category-dialog-manager/category-dialog-manager.component";
import {ConfirmationDialogComponent} from "../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.scss']
})
export class CategoryPanelComponent implements OnInit {
  // :::
  //
  @ViewChild("list") list!: CategoryListComponent;

  // ::: vars
  //

  // ::: constructor
  //
  constructor(
    public appService: AppService,
    @Inject(APP_DTO) public data: any) {
  }

  // ::: init
  //

  // ::: ng
  //
  ngOnInit() {
    this.find();
  }

  // ::: ui
  //
  openCategoryDialog() {
    this.openDialog(CategoryDialogManagerComponent)
  }

  onListAction(event: any) {
    switch (event.name) {
      case "select":
        this.openDialog(CategoryDialogManagerComponent, event.data, "readonly")
        break;
      case "edit":
        this.openDialog(CategoryDialogManagerComponent, event.data)
        break;
      case "delete":
        this.openDialog(ConfirmationDialogComponent, event.data, "readonly")
        break;
    }
  }

// ::: methods
//
  find(id?: any) {
    if (!id) {
      this.appService.inventory().category().list()
        .onSuccess(msg => {
          this.list.getDataSubject().data = msg.categoryResponse.category;
        })
        .call();
      return;
    }
    this.appService.inventory().category().get(id)
      .onSuccess(msg => {
        this.list.getDataSubject().data = msg.categoryResponse.category;
      })
      .onError(() => this.find())
      .call();
  }

  openDialog(component?: any, data?: any, mode?: any, config?: any) {
    let ref = this.appService.dialogManager().open(component, data, mode, config);
    ref.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'yes') {
          this.appService.inventory().category().delete(result.id)
            .onSuccess(() => this.find())
            .call();
          return;
        }
        this.find();
      }
    })
  }

}
