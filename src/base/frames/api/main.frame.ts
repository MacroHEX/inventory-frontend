import {ContainerFrame} from "./container.frame";
import {ComponentPortal} from "@angular/cdk/portal";

export interface MainFrame extends ContainerFrame {

  // ::: header
  //
  getHeaderPortal(): ComponentPortal<any> | undefined;

  loadHeader(comp: any, data?: any): void;

  unloadHeader(): void;

  getHeaderComponent(): any;

  isHeaderAttached(): boolean;

  // ::: content
  //
  getContentPortal(): ComponentPortal<any> | undefined;

  loadContent(comp: any, data?: any): void;

  unloadContent(): void;

  getContentComponent(): any;

  isContentAttached(): boolean;

  // ::: footer
  //
  getFooterPortal(): ComponentPortal<any> | undefined;

  loadFooter(comp: any, data?: any): void;

  unloadFooter(): void;

  getFooterComponent(): any;

  isFooterAttached(): boolean;

}
