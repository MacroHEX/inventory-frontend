import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {BaseException} from "../validation/base-exception";

// ::: Error Manager Factory
//
export interface ErrorManagerFactory {

  errorManager(): ErrorManager;

}

// ::: Error Manager
//
export interface ErrorManager {

  handle(err: any): void;
}

// ::: Base ErrorManager
//
export class BaseErrorManager implements ErrorManager {

  // ::: vars
  //
  _mode: string = "snack";
  _snack: MatSnackBar;

  // ::: constructor
  //
  constructor(_snack: MatSnackBar) {
    this._snack = _snack;
  }

  get mode() {
    return this._mode;
  }

  set mode(s: string) {
    this._mode = s;
  }

  // ::: api
  //
  handle(err: any): void {
    switch (this._mode) {
      case "snack":
        this.snack(err);
        break;
      default:
        this.snack(err);
        break;
    }
  }

  snack(err?: any, config?: any) {
    if (err) {
      config = config || {
        duration: 2000
      };

      if (err instanceof HttpErrorResponse) {
        this.snack((err as HttpErrorResponse).message, config);
      } else if (err instanceof BaseException) {
        this.snack((<BaseException>err).message, config);
      } else if (err instanceof String) {
        this.snack(<string>err, config);
      } else {
        //this.snack((<EndpointFailure>ex).description, config);
      }
    }
  }
}
