import {BaseComponentFrame} from "./base-component.frame";
import {AppFrame} from "./api/app.frame";
import {FrameManagerFactory} from "./base-frame-manager";
import {ComponentPortal} from "@angular/cdk/portal";

export class BaseAppFrame extends BaseComponentFrame implements AppFrame {

  // ::: vars
  //
  _homeType: any;
  _homeData: any;
  _mainType: any;
  mainPortal?: ComponentPortal<any>;

  // ::: constructor
  //
  constructor(_factory: FrameManagerFactory, _parent?: any, _data?: any) {
    super(_factory, _parent, _data);
  }

  // ::: api
  //
  override getAppFrame(): AppFrame | undefined {
    return this;
  }

  // ::: home
  //
  setAsHome(comp: any, data?: any): void {
    this._homeType = comp;
    this._homeData = data;
  }

  loadHome(data?: any): void {
    if (this._homeType) {
      this.loadMain(this._homeType, data || this._homeData);
    }
  }

  // ::: main
  //
  getMainPortal(): ComponentPortal<any> | undefined {
    return this.mainPortal;
  }

  loadMain(comp: any, data?: any): void {
    let fm = this._factory.frameManager();
    this._mainType = comp;
    this.mainPortal = fm.newPortal(comp, this, data);
  }

  getMainComponent(): any {
    return this.mainPortal?.component;
  }

  reloadMain(data?: any): void {
    if (this._mainType) {
      this.loadMain(this._mainType, data);
    }
  }

  isMainAttached(): boolean {
    return this.mainPortal?.isAttached || false;
  }


}
