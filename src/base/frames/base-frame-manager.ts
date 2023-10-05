import {Injector} from "@angular/core";
import {ComponentPortal} from "@angular/cdk/portal";
import {APP_DTO, APP_PARENT} from "../base.module";

// ::: Factory
//
export interface FrameManagerFactory {

  frameManager(): FrameManager;

}

// ::: Manager
//
export interface FrameManager {

  newPortal(comp: any, parent: any, data?: any): ComponentPortal<any>;

}

// ::: Base Manager
//
export class BaseFrameManager implements FrameManager {

  // ::: vars
  //
  _injector: Injector;

  // ::: constructor
  //
  constructor(_injector: Injector) {
    this._injector = _injector;
  }

  // ::: FRAMES
  //
  newPortal(comp: any, parent: any, data?: any) {
    return new ComponentPortal(comp, null, this.newInjector(parent, data));
  }

  newInjector(parent: any, data?: any): Injector {
    return Injector.create({
      providers: [
        {provide: APP_PARENT, useValue: parent},
        {provide: APP_DTO, useValue: data}
      ],
      parent: this._injector
    });
  }
}
