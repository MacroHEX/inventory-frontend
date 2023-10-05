// ::: Dialog Manager Factory Interface
//
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogManagerFactory {

  dialogManager(): DialogManager;

}

// ::: Dialog Manager Interface
//
export interface DialogManager {

  open(comp: any, data?: any, mode?: string, config?: any): MatDialogRef<any>;
}

// ::: Base Dialog Manager
//
export class BaseDialogManager implements DialogManager {

  // ::: vars
  //
  _dialog: MatDialog;

  // ::: constructor
  //
  constructor(_dialog: MatDialog) {
    this._dialog = _dialog;
  }

  open(comp: any, data?: any, mode?: string, config?: any): MatDialogRef<any> {
    let arg = config || {
      minWidth: '300px',
      width: 'fit-content',
      height: 'fit-content'
    };

    arg.data = {
      mode: mode || "normal",
      data: data
    };

    return this._dialog.open(comp, arg);
  }

}
