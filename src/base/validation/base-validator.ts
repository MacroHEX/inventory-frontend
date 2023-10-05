import {BaseException, BaseExceptionBuilder, BaseExceptionPrototype} from "./base-exception";

// ::: VALIDATOR
//
export class V {

  static isNull(v: any): boolean {
    return !v;
  }

  static isEmpty(v: any): boolean {
    if (v) {
      if (v instanceof String) {
        return v.length == 0;
      } else if (Array.isArray(v)) {
        return v.length == 0;
      } else if (v instanceof Number) {
        return v == 0;
      }
    }

    return true;
  }

  static ifNull(v: any, builder: Thrower | BaseException | BaseExceptionPrototype | BaseExceptionBuilder) {
    if (V.isNull(v)) {
      V.throwException(builder);
    }
  }

  static ifNotNull(v: any, builder: Thrower | BaseException | BaseExceptionPrototype | BaseExceptionBuilder) {
    if (!V.isNull(v)) {
      V.throwException(builder);
    }
  }

  static ifTrue(v: any, builder: Thrower | BaseException | BaseExceptionPrototype | BaseExceptionBuilder) {
    if (v) {
      V.throwException(builder);
    }
  }

  static ifFalse(v: any, builder: Thrower | BaseException | BaseExceptionPrototype | BaseExceptionBuilder) {
    if (!v) {
      V.throwException(builder);
    }
  }


  static ifEmpty(v: any, builder: Thrower | BaseException | BaseExceptionPrototype | BaseExceptionBuilder) {
    if (V.isEmpty(v)) {
      V.throwException(builder);
    }
  }

  static ifNotEmpty(v: any, builder: Thrower | BaseException | BaseExceptionPrototype | BaseExceptionBuilder) {
    if (!V.isEmpty(v)) {
      V.throwException(builder);
    }
  }

  static throwException(builder: Thrower | BaseException | BaseExceptionBuilder | BaseExceptionPrototype) {
    if (builder instanceof Thrower) {
      builder.throwException();
    } else if (builder instanceof BaseException) {
      throw <BaseException>builder;
    } else if (builder instanceof BaseExceptionBuilder) {
      throw builder.toException();
    } else {
      throw new BaseException(builder);
    }
  }
}

// ::: THROWER
//
export class Thrower {

  newException(): BaseException {
    return new BaseException();
  }

  throwException(proto?: BaseExceptionPrototype) {
    if (proto) {
      throw new BaseException(<BaseExceptionPrototype>proto);
    }

    throw this.newException();
  }
}
