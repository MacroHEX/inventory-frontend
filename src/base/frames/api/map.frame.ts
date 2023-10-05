import {ContainerFrame} from "./container.frame";
import {ComponentPortal} from "@angular/cdk/portal";
import {PortalDefinition, PortalUse} from "./base.frame";

export interface MapFrame extends ContainerFrame {

  // ::: portals
  //
  getPortalNames(): IterableIterator<string>;

  getPortals(use?: PortalUse): ComponentPortal<any>[];

  getPortal(name: string): ComponentPortal<any> | undefined;

  getPortalDef(name: string): PortalDefinition | undefined;

  loadPortal(name: string, component: any, data?: any): ComponentPortal<any> | undefined;

  loadPortalAsEmpty(name: string): void;

  unloadPortal(name: string): void;

  isPortalLoaded(name: string): boolean;

  addPortal(def: PortalDefinition): void;

  // ::: visibility
  //
  setPortalVisilibity(name: string, visible: boolean): void;

  togglePortalVisibility(name: string): void;


  // ::: portal components
  //
  getComponent(name: string): any;

  hasComponent(name: string): boolean;

  collapseComponent(name: string): void;

}
