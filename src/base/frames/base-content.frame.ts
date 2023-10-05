import {BaseComponentFrame} from "./base-component.frame";
import {FrameManagerFactory} from "./base-frame-manager";
import {ComponentPortal} from "@angular/cdk/portal";
import {ContentFrame} from "./api/content.frame";

export class BaseContentFrame extends BaseComponentFrame implements ContentFrame {

  // ::: vars
  //
  menuPortal?: ComponentPortal<any>;
  panelPortal?: ComponentPortal<any>;
  contextPortal?: ComponentPortal<any>;
  footerPortal?: ComponentPortal<any>;

  // ::: constructor
  //
  constructor(_factory: FrameManagerFactory, _parent: any, _data: any) {
    super(_factory, _parent, _data);
  }

  // ::: menu
  //
  getMenuPortal(): ComponentPortal<any> | undefined {
    return this.menuPortal;
  }

  loadMenu(comp: any, data?: any): void {
    this.menuPortal = this._factory.frameManager().newPortal(comp, this, data);
  }

  unloadMenu(): void {
    this.menuPortal = undefined;
  }

  getMenuComponent(): any {
    return this.menuPortal?.component;
  }

  isMenuAttached(): boolean {
    return this.menuPortal?.isAttached || false;
  }

  // ::: panel
  //
  getPanelPortal(): ComponentPortal<any> | undefined {
    return this.panelPortal;
  }

  loadPanel(comp: any, data?: any): void {
    this.panelPortal = this._factory.frameManager().newPortal(comp, this, data);
  }

  unloadPanel(): void {
    this.panelPortal = undefined;
  }

  getPanelComponent(): any {
    return this.panelPortal?.component;
  }

  isPanelAttached(): boolean {
    return this.panelPortal?.isAttached || false;
  }

  // ::: context
  //
  getContextPortal(): ComponentPortal<any> | undefined {
    return this.contextPortal;
  }

  loadContext(comp: any, data?: any): void {
    this.contextPortal = this._factory.frameManager().newPortal(comp, this, data);
  }

  unloadContext(): void {
    this.contextPortal = undefined;
  }

  getContextComponent(): any {
    return this.contextPortal?.component;
  }

  isContextAttached(): boolean {
    return this.contextPortal?.isAttached || false;
  }

  // ::: footer
  //
  getFooterPortal(): ComponentPortal<any> | undefined {
    return this.footerPortal;
  }

  loadFooter(comp: any, data?: any): void {
    this.footerPortal = this._factory.frameManager().newPortal(comp, this, data);
  }

  unloadFooter(): void {
    this.footerPortal = undefined;
  }

  getFooterComponent(): any {
    return this.footerPortal?.component;
  }

  isFooterAttached(): boolean {
    return this.footerPortal?.isAttached || false;
  }

}
