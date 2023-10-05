export class BaseException implements BaseExceptionPrototype {

  // ::: vars
  //
  code: number = 1; // unknown
  name: string | undefined = undefined;
  message: string | undefined = undefined;
  extra: any = undefined;

  // ::: constructor
  //
  constructor(proto?: BaseExceptionPrototype) {
    if (proto) {
      this.code = proto.code || 1;
      this.name = proto.name;
      this.message = proto.message;
      this.extra = proto.extra;
    }
  }

  clone(): BaseException {
    return BaseException.newInstance(this.code, this.name, this.message, this.extra);
  }

  static newInstance(code: number, name?: string, message?: string, extra?: any): BaseException {
    let ex = new BaseException();
    ex.code = code;
    ex.name = name;
    ex.message = message;
    ex.extra = extra;
    return ex;
  }
}

export interface BaseExceptionPrototype {

  get code(): number | undefined;

  get name(): string | undefined;

  get message(): string | undefined;

  get extra(): any;
}

export abstract class BaseExceptionBuilder {

  abstract toException(): BaseException;

}
