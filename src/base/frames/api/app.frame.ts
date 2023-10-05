import {ContainerFrame} from "./container.frame";
import {ComponentPortal} from "@angular/cdk/portal";

export interface AppFrame extends ContainerFrame {

  // ::: home
  //
  setAsHome(comp: any, data?: any): void;

  loadHome(data?: any): void;

  // ::: main
  //
  getMainPortal(): ComponentPortal<any> | undefined;

  loadMain(comp: any, data?: any): void;

  reloadMain(data?: any): void;

  getMainComponent(): any;

  isMainAttached(): boolean;

}
