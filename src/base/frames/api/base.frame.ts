export enum PortalUse {
  APP,
  CONTAINER,
  HEADER,
  CONTENT,
  PANEL,
  MENU,
  CONTEXT,
  FOOTER
}

export class PortalDefinition {

  constructor(name?: string, use?: PortalUse, description?: string) {
    this.name = name;
    this.use = use;
    this.description = description;
  }

  name?: string;
  use?: PortalUse;
  description?: string;
}

