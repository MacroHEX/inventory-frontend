import {BaseComponentFrame} from "./base-component.frame";
import {FrameManagerFactory} from "./base-frame-manager";
import {ComponentPortal} from "@angular/cdk/portal";
import {MainFrame} from "./api/main.frame";

export class BaseMainFrame extends BaseComponentFrame implements MainFrame {

  // ::: vars
  //
  headerPortal?: ComponentPortal<any>;
  contentPortal?: ComponentPortal<any>;
  footerPortal?: ComponentPortal<any>;

  // ::: constructor
  //
  constructor(_factory: FrameManagerFactory, _parent: any, _data: any) {
    super(_factory, _parent, _data);
  }

  // ::: header
  //
  getHeaderPortal(): ComponentPortal<any> | undefined {
    return this.headerPortal;
  }

  loadHeader(comp: any, data?: any): void {
    this.headerPortal = this._factory.frameManager().newPortal(comp, this, data);
  }

  unloadHeader(): void {
    this.headerPortal = undefined;
  }

  getHeaderComponent(): any {
    return this.headerPortal?.component;
  }

  isHeaderAttached(): boolean {
    return this.headerPortal?.isAttached || false;
  }

  // ::: content
  //
  getContentPortal(): ComponentPortal<any> | undefined {
    return this.contentPortal;
  }

  loadContent(comp: any, data?: any): void {
    this.contentPortal = this._factory.frameManager().newPortal(comp, this, data);
  }

  unloadContent(): void {
    this.contentPortal = undefined;
  }

  getContentComponent(): any {
    return this.contentPortal?.component;
  }

  isContentAttached(): boolean {
    return this.contentPortal?.isAttached || false;
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
