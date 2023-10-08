import {Injectable, Injector} from '@angular/core';
import {BaseFrameManager, FrameManager, FrameManagerFactory} from "../../base/frames/base-frame-manager";
import {BaseDialogManager, DialogManager, DialogManagerFactory} from "../../base/dialogs/base-dialog-manager";
import {BaseErrorManager, ErrorManager, ErrorManagerFactory} from "../../base/errors/error-manager";
import {BaseIdManager, IdManager, IdManagerFactory} from "../../base/ids/id-manager";
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {RestBase} from "../../base/rest/rest";
import {InventoryRest} from "./inventory.rest";

@Injectable({
  providedIn: 'root'
})
export class AppService implements FrameManagerFactory, DialogManagerFactory, ErrorManagerFactory, IdManagerFactory {

  // ::: vars
  //
  rootApp!: AppComponent;

  // ::: constructor
  //
  constructor(private injector: Injector,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private httpClient: HttpClient,
              // private keycloak: KeycloakService
  ) {
  }

  // ::: app
  //
  appInit(app: AppComponent) {
    this.rootApp = app;
  }

  app() {
    return this.rootApp;
  }

  // ::: UI SNACKS
  //
  snack(text?: string, action?: string, customConfig?: MatSnackBarConfig) {
    if (text) {
      let config = customConfig || {
        duration: 2000
      }
      this.snackBar.open(text, action, config);
    }
  }

  // ::: ID MANAGER
  //
  idManager(): IdManager {
    return new BaseIdManager();
  }

  // ::: ERROR MANAGER
  //
  errorManager(): ErrorManager {
    return new BaseErrorManager(this.snackBar);
  }

  // ::: DIALOG MANAGER
  //
  dialogManager(): DialogManager {
    return new BaseDialogManager(this.dialog);
  }

  // ::: FRAME MANAGER
  //
  frameManager(): FrameManager {
    return new BaseFrameManager(this.injector);
  }

  // ::: REST
  //
  inventory() {
    let base = new RestBase(this.httpClient);
    base.server("http://localhost:8080/api/v1");
    base.context({expectedResult: "inventory"});

    base.onError((err) => {
      try {
        this.errorManager().handle(err)
      } catch (throwable) {
        console.error(throwable);
      }
    });

    return new InventoryRest(base);
  }
}
