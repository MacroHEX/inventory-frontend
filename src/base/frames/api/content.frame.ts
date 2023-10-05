import {ContainerFrame} from "./container.frame";
import {ComponentPortal} from "@angular/cdk/portal";

export interface ContentFrame extends ContainerFrame {

  // ::: menu
  //
  getMenuPortal(): ComponentPortal<any> | undefined;

  loadMenu(comp: any, data?: any): void;

  unloadMenu(): void;

  getMenuComponent(): any;

  isMenuAttached(): boolean;

  // ::: panel
  //
  getPanelPortal(): ComponentPortal<any> | undefined;

  loadPanel(comp: any, data?: any): void;

  unloadPanel(): void;

  getPanelComponent(): any;

  isPanelAttached(): boolean;

  // ::: context
  //
  getContextPortal(): ComponentPortal<any> | undefined;

  loadContext(comp: any, data?: any): void;

  unloadContext(): void;

  getContextComponent(): any;

  isContextAttached(): boolean;


  // ::: footer
  //
  getFooterPortal(): ComponentPortal<any> | undefined;

  loadFooter(comp: any, data?: any): void;

  unloadFooter(): void;

  getFooterComponent(): any;

  isFooterAttached(): boolean;

}
