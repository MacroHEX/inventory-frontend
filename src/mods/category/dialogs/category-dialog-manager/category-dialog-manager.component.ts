import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app/services/app.service";

@Component({
  selector: 'app-category-dialog-manager',
  templateUrl: './category-dialog-manager.component.html',
  styleUrls: ['./category-dialog-manager.component.scss']
})
export class CategoryDialogManagerComponent {
  // :::
  //

  // ::: vars
  //
  mainForm!: FormGroup;
  mode!: string;
  readOnly?: boolean; // example only
  title = "Categoría";

  // ::: constructor
  //
  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<CategoryDialogManagerComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initMode();
    this.initForms();
  }

  // ::: init
  //
  initMode() {
    this.mode = this.data?.mode || "normal";
    this.readOnly = this.mode === 'readonly';
  }

  initForms() {
    this.mainForm = this.formBuilder.group({
      idCtrl: [this.data.data?.id || ''],
      nameCtrl: [this.data.data?.name || '', Validators.required],
      descCtrl: [this.data.data?.description || '']
    });
  }

  // ::: ng
  //

  // ::: ui
  //
  performDialog() {
    let arg = {
      id: this.mainForm.controls['idCtrl'].value,
      name: this.mainForm.controls['nameCtrl'].value,
      description: this.mainForm.controls['descCtrl'].value
    }

    if (!this.data.data.id) {
      this.appService.inventory().category().post().body(arg)
        .onSuccess(msg => {
          this.closeDialog(msg);
        })
        .call();
      return;
    }
    this.appService.inventory().category().put(this.data.data.id).body(arg)
      .onSuccess(msg => {
        this.closeDialog(msg);
      })
      .call();
  }

  closeDialog(result?: any) {
    this.dialogRef.close(result);
  }

  // ::: methods
  //


}
