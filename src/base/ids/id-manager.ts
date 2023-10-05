import * as uuid from 'uuid';

// ::: ID Manager Factory
//
export interface IdManagerFactory {
  idManager(): IdManager;
}

// ::: Id Manager
//
export interface IdManager {

  uuid(): string;

  normalize(name: string | undefined): string | undefined;
}

// ::: Base ID Manager
//
export class BaseIdManager implements IdManager {

  // ::: vars
  //

  // ::: constructor
  //

  // ::: api
  //
  uuid(): string {
    return uuid.v4();
  }

  normalize(name: string | undefined): string | undefined {
    if (name) {
      name = name.trim().toLowerCase();
      name = name.replace(/[^a-zA-Z-0-9]/g, "_");
    }

    return name ? name : undefined;
  }
}
