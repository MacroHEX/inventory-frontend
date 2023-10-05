import {ContainerFrame} from "./api/container.frame";
import {FrameManagerFactory} from "./base-frame-manager";
import {AppFrame} from "./api/app.frame";

export class BaseComponentFrame implements ContainerFrame {

  // ::: vars
  //
  _factory: FrameManagerFactory;
  _parent: any;
  _initData: any;

  constructor(factory: FrameManagerFactory, parent: any, data: any) {
    this._factory = factory;
    this._parent = parent;
    this._initData = data;
  }

  // ::: api
  //
  getFrameComponent(): any {
    return this;
  }

  getFrameData(): any {
    return this._initData;
  }

  getParentFrame(): ContainerFrame {
    return this._parent;
  }

  getAppFrame(): AppFrame | undefined {
    return this._parent && this._parent instanceof BaseComponentFrame ? this._parent.getAppFrame() : undefined;
  }

}
