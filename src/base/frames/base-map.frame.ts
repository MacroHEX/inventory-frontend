import {ComponentPortal} from "@angular/cdk/portal";
import {FrameManagerFactory} from "./base-frame-manager";
import {PortalDefinition, PortalUse} from "./api/base.frame";
import {BaseComponentFrame} from "./base-component.frame";
import {MapFrame} from "./api/map.frame";

// ::: NO USAR!!!
//
export class BaseMapFrame extends BaseComponentFrame implements MapFrame {

  // ::: vars
  //
  _registry = new Map<string, PortalDefinition | undefined>();
  _portals = new Map<string, ComponentPortal<any> | undefined>();

  constructor(factory: FrameManagerFactory, parent: any, data: any) {
    super(factory, parent, data);
  }

  // ::: api
  //
  addPortal(def: PortalDefinition): void {
    this._registry.set(def.name!, def);
  }

  collapseComponent(name: string): void {
    // XXX todo
  }

  getComponent(name: string): any {
    let portal = this._portals.get(name);
    return portal?.component;
  }

  getPortal(name: string): ComponentPortal<any> | undefined {
    return this._portals.get(name);
  }

  getPortalDef(name: string): PortalDefinition | undefined {
    return this._registry.get(name);
  }

  getPortalNames(): IterableIterator<string> {
    return this._registry.keys();
  }

  getPortals(use?: PortalUse): ComponentPortal<any>[] {
    let list: ComponentPortal<any>[] = [];

    for (let i of this._registry.keys()) {
      let def = this._registry.get(i);
      let portal = this._portals.get(i);
      if (def && portal) {
        if (use && use == def.use) {
          list.push(portal);
        } else if (!use) {
          list.push(portal);
        }
      }
    }

    return list;
  }

  hasComponent(name: string): boolean {
    let portal = this._portals.get(name);
    return portal?.component ? true : false;
  }

  isPortalLoaded(name: string): boolean {
    return this.hasComponent(name);
  }

  loadPortal(name: string, component: any, data?: any): ComponentPortal<any> | undefined {
    let fm = this._factory.frameManager();
    let portal = fm.newPortal(component, data);
    this._portals.set(name, portal);
    return portal;
  }

  loadPortalAsEmpty(name: string): void {
    let fm = this._factory.frameManager();
    //let portal = fm.newPortal(EmptyFrameComponent);
    //this._portals.set(name, portal);
  }

  setPortalVisilibity(name: string, visible: boolean): void {
    let portal = this._portals.get(name);
    if (portal && portal.viewContainerRef) {
      // XXX todo
      portal.viewContainerRef.element.nativeElement.setAttribute("hidden", !visible);
    }
  }

  togglePortalVisibility(name: string): void {
    let portal = this._portals.get(name);
    if (portal && portal.viewContainerRef) {
      // XXX todo
      //portal.viewContainerRef.element.nativeElement.setAttribute("hidden", !visible);
    }
  }

  unloadPortal(name: string): void {
    this._portals.set(name, undefined);
  }

}
