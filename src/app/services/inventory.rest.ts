import {RestBase, RestCaller, RestProtocol} from "../../base/rest/rest";
import {BaseException} from "../../base/validation/base-exception";
import {HttpErrorResponse} from "@angular/common/http";

class InventoryProtocol implements RestProtocol {
  requestMessage(caller: RestCaller, o: any): any {
    return o;

    // return {
    //   id: uuid.v4(),
    //   message: o ? o : {}
    // };
  }

  responseMessage(caller: RestCaller, o: any): any {
    // return o;
    let expected = caller.getBuilder().getContext()?.expectedResult;
    switch (expected) {
      case "Example":
        return o?.message;
      default:
        return o;
    }
  }

  errorMessage(caller: RestCaller, err: any): any {
    if (err) {
      if (err instanceof BaseException) {
        return err;
      } else if (err instanceof HttpErrorResponse) {
        // XXX todo
      } else if (err.failure) {
        let ex = new BaseException();
        ex.code = err.failure.code;
        ex.name = err.failure.name;
        ex.message = err.failure.description;
        return ex;
        /*} else {
          let ex = new BaseException();
          ex.message = err;
          return ex;*/
      }
    }
  }

  isSuccess(caller: RestCaller, o: any): boolean {
    let expected = caller.getBuilder().getContext()?.expectedResult;
    switch (expected) {
      case "Example":
        return o?.status === 0;
      default:
        return o;
    }
  }
}

// ::: Inventory REST
//
export class InventoryRest {

  // ::: vars
  //
  _base: RestBase;

  // ::: constructors
  //
  constructor(base: RestBase) {
    this._base = base;
    this._base.getContext().expectedResult = "inventory";
    //authRequired() ??
    this._base.protocol = new InventoryProtocol();
  }

  // ::: modules
  //
  category() {
    let newBase = this._base.rebase("/category");
    return new Category(newBase);
  }
}

// ::: Category
//
export class Category {
  // ::: vars
  //
  _base: RestBase;

  // ::: constructor
  //
  constructor(base: RestBase) {
    this._base = base;
  }

  // ::: methods
  //
  list() {
    return this._base.builder().caller().methodGet();
  }

  get(id: string) {
    return this._base.builder().slash().resource(id).caller().methodGet();
  }

  post() {
    return this._base.builder().caller().methodPost();
  }

  put(id: string) {
    return this._base.builder().slash().resource(id).caller().methodPut();
  }

  delete(id: string) {
    return this._base.builder().slash().resource(id).caller().methodDelete();
  }
}
