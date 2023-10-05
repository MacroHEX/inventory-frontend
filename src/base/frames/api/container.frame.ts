import {AppFrame} from "./app.frame";

export interface ContainerFrame {

  // :::
  //
  getAppFrame(): AppFrame | undefined;

  getParentFrame(): ContainerFrame | undefined;

  getFrameData(): any;

  getFrameComponent(): any;


}

