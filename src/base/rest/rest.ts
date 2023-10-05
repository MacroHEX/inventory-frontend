import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
  HttpResponseBase
} from "@angular/common/http";
import {catchError, EMPTY, Observable, Subscription} from "rxjs";

export class RestScope {

  protected _base: RestBase;

  constructor(base: RestBase) {
    this._base = base;
  }

}

export class RestLeaf extends RestScope {

  constructor(base: RestBase) {
    super(base);
  }

  find(params?: any): RestCaller {
    let builder = this._base.builder().params(params);
    return builder.caller().methodGet();
  }

  update(res: any, params?: any): RestCaller {
    let builder = this._base.builder().body(res).params(params);
    return builder.caller().methodPut();
  }

  delete(): RestCaller {
    let builder = this._base.builder();
    return builder.caller().methodDelete();
  }
}

export class RestRepository extends RestScope {

  constructor(base: RestBase) {
    super(base);
  }

  with(id: string): RestLeaf {
    return new RestLeaf(this._base.rebase().slash().next(id));
  }

  list(params?: any): RestCaller {
    let builder = this._base.builder().params(params);
    return builder.caller().methodGet();
  }

  find(id: string, params?: any): RestCaller {
    let builder = this._base.builder().slash().resource(id).params(params);
    return builder.caller().methodGet();
  }

  insert(res: any): RestCaller {
    let builder = this._base.builder().body(res);
    return builder.caller().methodPost();
  }

  update(id: string, res: any): RestCaller {
    let builder = this._base.builder().slash().resource(id).body(res);
    return builder.caller().methodPut();
  }

  delete(id: string): RestCaller {
    let builder = this._base.builder().slash().resource(id);
    return builder.caller().methodDelete();
  }
}

// :::::: CUSTOM PROTOCOL ::::::

export interface RestProtocol {

  requestMessage(caller: RestCaller, o: any): any;

  responseMessage(caller: RestCaller, o: any): any;

  errorMessage(caller: RestCaller, o: any): any;

  isSuccess(caller: RestCaller, o: any): boolean;
}

// :::::: REST ::::::

export interface Rest<T> {

  // context
  getContext(): any;

  context(ctxt: any | {}): T;

  contextValue(name: string, value: any): T;

  // resource
  server(s: string): T;

  location(s: string): T;

  next(s: string): T;

  slash(): T;

  resource(s: string): T;

  // auth
  auth(s: string): T;

  authBearer(s: string): T;

  authBasic(username: string, password: string): T;

  authBasicToken(s: string): T;

  // accept
  accept(s: string): T;

  acceptJson(): T;

  // content type
  contentType(s: string): T;

  contentText(): T;

  contentJson(): T;

  contentForm(): T;

  contentMultipart(): T;

  observeBody(): T;

  observeResponse(): T;

  observeEvents(): T;

  responseText(): T;

  responseJson(): T;

  responseArrayBuffer(): T;

  responseBlob(): T;

  /*
    //let observe; body / response / events
    //let responseType; text / json / arraybuffer / blob

  optionObserve
  optionResponseType
  optionWithCredentials
  optionReportProgress
   */

  // header
  header(h: string, s: string): T;

  headers(h: HttpHeaders): T;

  getHeaders(): HttpHeaders;

  //
  getUrl(): string;

  getClient(): HttpClient;

  // listeners
  onSuccess(lambda: (msg: any) => {}): T;

  onError(lambda: (err: any) => {}): T;

  onResponse(lambda: (resp: any) => {}): T;

  onFinish(lambda: (resp: any) => {}): T;

  get protocol(): RestProtocol | undefined;

  set protocol(p: RestProtocol | undefined);

  // builder
  builder(): RestBuilder;
}

export class RestBase implements Rest<RestBase> {

  // ::: vars
  //
  _http: HttpClient;
  _context: any = {};
  _server?: string;
  _location?: string;
  _resource?: string;
  _observe: string = "body";
  _responseType: string = "json";
  _headers: HttpHeaders;
  _onSuccess?: Function;
  _onError?: Function;
  _onResponse?: Function;
  _onFinish?: Function;
  _protocol?: RestProtocol;

  // ::: constructor
  //
  constructor(http: HttpClient, base?: RestBase) {
    this._http = http;
    this._headers = new HttpHeaders();

    if (base) {
      this.load(base);
    }
  }

  load(base: RestBase): RestBase {
    this._context = base._context;
    this._server = base._server || "";
    this._location = base._location || "";
    this._resource = base._resource || "";
    this._onSuccess = base._onSuccess || this._onSuccess;
    this._onError = base._onError || this._onError;
    this._onResponse = base._onResponse || this._onResponse;
    this._onFinish = base._onFinish || this._onFinish;
    this._protocol = base._protocol || this._protocol;

    this._observe = base._observe || this._observe;
    this._responseType = base._responseType || this._responseType;
    this.headers(base._headers);

    return this;
  }

  // ::: context
  //
  getContext(): any {
    return this._context;
  }

  context(ctxt: {} | {}): RestBase {
    this._context = ctxt;
    return this;
  }

  contextValue(name: string, value: any): RestBase {
    this._context[name] = value;
    return this;
  }

  // ::: resource
  //
  server(s: string): RestBase {
    this._server = s;
    return this;
  }

  location(s: string): RestBase {
    this._location = s;
    return this;
  }

  next(s: string): RestBase {
    this._location += s;
    return this;
  }

  slash(): RestBase {
    this.next("/");
    return this;
  }

  resource(s: string): RestBase {
    this._resource = s;
    return this;
  }

  // accept
  accept(s: string): RestBase {
    return this.header("Accept", s);
  }

  acceptJson(): RestBase {
    return this.accept("application/json");
  }

  // auth
  auth(s: string): RestBase {
    return this.header("Authorization", s);
  }

  authBasic(username: string, password: string): RestBase {
    let token = btoa(username + ":" + password)
    return this.authBasicToken(token);
  }

  authBasicToken(s: string): RestBase {
    return this.auth("Basic " + s);
  }

  authBearer(s: string): RestBase {
    return this.auth("Bearer " + s);
  }

  // content
  contentType(s: string): RestBase {
    return this.header("Content-Type", s);
  }

  contentText(): RestBase {
    return this.contentType("text/plain");
  }

  contentForm(): RestBase {
    return this.contentType("application/x-www-form-urlencoded");
  }

  contentJson(): RestBase {
    return this.contentType("application/json");
  }

  contentMultipart(): RestBase {
    return this.contentType("multipart/form-data");
  }

  observeBody(): RestBase {
    this._observe = 'body';
    return this;
  }

  observeResponse(): RestBase {
    this._observe = 'response';
    return this;
  }

  observeEvents(): RestBase {
    this._observe = 'events';
    return this;
  }

  responseText(): RestBase {
    this._responseType = 'text';
    return this;
  }

  responseJson(): RestBase {
    this._responseType = 'json';
    return this;
  }

  responseArrayBuffer(): RestBase {
    this._responseType = 'arraybuffer';
    return this;
  }

  responseBlob(): RestBase {
    this._responseType = 'blob';
    return this;
  }

  // header
  header(h: string, s: string | string[]): RestBase {
    this._headers.set(h, s);
    return this;
  }

  headers(h: HttpHeaders): RestBase {
    if (h) {
      let keys = h.keys();
      for (let i = 0; keys.length; i++) {
        let name = keys[i];
        let value = h.get(name);
        if (value) {
          this._headers.set(name, value);
        }
      }
    }
    return this;
  }

  getHeaders(): HttpHeaders {
    return this._headers;
  }

  getUrl(): string {
    let s = "" + (this._server ? this._server : "")
      + (this._location ? this._location : "")
      + (this._resource ? this._resource : "");
    return s;
  }

  getClient(): HttpClient {
    return this._http;
  }

  // ::: listeners
  //
  onSuccess(lambda: (msg: any) => void): RestBase {
    this._onSuccess = lambda;
    return this;
  }

  onError(lambda: (msg: any) => void): RestBase {
    this._onError = lambda;
    return this;
  }

  onResponse(lambda: (msg: any) => void): RestBase {
    this._onResponse = lambda;
    return this;
  }

  onFinish(lambda: (msg: any) => void): RestBase {
    this._onFinish = lambda;
    return this;
  }

  get protocol(): RestProtocol | undefined {
    return this._protocol;
  }

  set protocol(p: RestProtocol | undefined) {
    this._protocol = p;
  }

  // ::: methods
  //
  rebase(branch?: string, id?: string): RestBase {
    let newBase = new RestBase(this._http, this);
    if (branch) {
      newBase.next(branch);
      if (id) {
        newBase.slash().next(id);
      }
    }
    return newBase
  }

  builder(): RestBuilder {
    return new RestBuilder(this._http, this);
  }
}

export class RestBuilder implements Rest<RestBuilder> {

  // ::: vars
  //
  _base: RestBase;
  _params?: any;
  _body?: any;
  _file?: File;
  _form?: FormData;


  // ::: constructor
  //
  constructor(http: HttpClient, base?: RestBase) {
    this._base = base || new RestBase(http);
  }

  // ::: context
  //
  getContext(): any {
    return this._base.getContext();
  }

  context(ctxt: {} | {}): RestBuilder {
    this._base._context = ctxt;
    return this;
  }

  contextValue(name: string, value: any): RestBuilder {
    this._base._context[name] = value;
    return this;
  }

  // ::: resource
  //
  location(s: string): RestBuilder {
    this._base.location(s);
    return this;
  }

  next(s: string): RestBuilder {
    this._base.next(s);
    return this;
  }

  slash(): RestBuilder {
    this._base.slash();
    return this;
  }

  resource(s: string): RestBuilder {
    this._base.resource(s);
    return this;
  }

  server(s: string): RestBuilder {
    this._base.server(s);
    return this;
  }

  // accept
  accept(s: string): RestBuilder {
    this._base.accept(s);
    return this;
  }

  acceptJson(): RestBuilder {
    this._base.acceptJson();
    return this;
  }

  // auth
  auth(s: string): RestBuilder {
    this._base.auth(s);
    return this;
  }

  authBasic(username: string, password: string): RestBuilder {
    this._base.authBasic(username, password);
    return this;
  }

  authBasicToken(s: string): RestBuilder {
    this._base.authBasicToken(s);
    return this;
  }

  authBearer(s: string): RestBuilder {
    this._base.authBearer(s);
    return this;
  }

  // content
  contentForm(): RestBuilder {
    this._base.contentForm();
    return this;
  }

  contentText(): RestBuilder {
    this._base.contentText();
    return this;
  }

  contentJson(): RestBuilder {
    this._base.contentJson();
    return this;
  }

  contentMultipart(): RestBuilder {
    this._base.contentMultipart();
    return this;
  }

  contentType(s: string): RestBuilder {
    this._base.contentType(s);
    return this;
  }

  observeBody(): RestBuilder {
    this._base.observeBody();
    return this;
  }

  observeResponse(): RestBuilder {
    this._base.observeResponse();
    return this;
  }

  observeEvents(): RestBuilder {
    this._base.observeEvents();
    return this;
  }

  responseText(): RestBuilder {
    this._base.responseText();
    return this;
  }

  responseJson(): RestBuilder {
    this._base.responseJson();
    return this;
  }

  responseArrayBuffer(): RestBuilder {
    this._base.responseArrayBuffer();
    return this;
  }

  responseBlob(): RestBuilder {
    this._base.responseBlob();
    return this;
  }

  // header
  header(h: string, s: string): RestBuilder {
    this._base.header(h, s);
    return this;
  }

  headers(h: HttpHeaders): RestBuilder {
    this._base.headers(h);
    return this;
  }

  getHeaders(): HttpHeaders {
    return this._base.getHeaders();
  }

  // ::: listeners
  //
  onSuccess(lambda: (msg: any) => void): RestBuilder {
    this._base.onSuccess(lambda);
    return this;
  }

  onError(lambda: (msg: any) => void): RestBuilder {
    this._base.onError(lambda);
    return this;
  }

  onResponse(lambda: (msg: any) => void): RestBuilder {
    this._base.onResponse(lambda);
    return this;
  }

  onFinish(lambda: (msg: any) => void): RestBuilder {
    this._base.onFinish(lambda);
    return this;
  }

  get protocol(): RestProtocol | undefined {
    return this._base._protocol;
  }

  set protocol(p: RestProtocol | undefined) {
    this._base._protocol;
  }

  getUrl(): string {
    return this._base.getUrl();
  }

  getClient(): HttpClient {
    return this._base.getClient();
  }

  // ::: methods
  //
  getUri(): string {
    let uri = this._base.getUrl() || "";
    let query = this.getQuery();
    if (query) {
      uri += "?" + query;
    }

    return uri;
  }

  getQuery(): string {
    let p = undefined;

    if (this._params instanceof HttpParams) {
      p = this._params;

    } else if (this._params) {
      p = new HttpParams({fromObject: this._params});
    }

    return p ? p.toString() : "";
  }

  body(body: any): RestBuilder {
    this._body = body;
    return this;
  }

  file(file: File): RestBuilder {
    this._file = file;
    return this;
  }

  form(form: FormData): RestBuilder {
    this._form = form;
    return this;
  }

  formField(name: string, value: any): RestBuilder {
    if (!this._form) {
      this._form = new FormData();
    }
    this._form.set(name, value);
    return this;
  }

  params(params: any): RestBuilder {
    this._params = params;
    return this;
  }

  param(h: string, v: string | boolean | number, append?: boolean): RestBuilder {
    if (this._params) {
      if (this._params instanceof HttpParams) {
        if (this._params.has(h) && append) {
          this._params.append(h, v);
        } else {
          this._params.set(h, v);
        }
      } else {
        this._params[h] = v;
      }

    } else {
      let p = new HttpParams();
      p.set(h, v);
      this._params = p;
    }
    return this;
  }

  // clone builder
  builder(): RestBuilder {
    let builder = new RestBuilder(this._base._http, this._base);
    builder._body = this._body;
    builder._params = this._params;
    return builder;
  }

  caller(): RestCaller {
    return new RestCaller(this.builder());
  }
}

export class RestCaller {

  // ::: vars
  //
  _builder: RestBuilder;
  _subscription?: Subscription;
  _method = "get";

  // ::: constructor
  //
  constructor(builder: RestBuilder) {
    this._builder = builder;
  }

  // ::: methods
  //
  getBuilder(): RestBuilder {
    return this._builder;
  }

  body(body: any): RestCaller {
    this._builder.body(body);
    return this;
  }

  params(params: any): RestCaller {
    this._builder.params(params);
    return this;
  }

  onResponse(lambda: (msg: any) => void): RestCaller {
    this._builder.onResponse(lambda);
    return this;
  }

  onSuccess(lambda: (msg: any) => void): RestCaller {
    this._builder.onSuccess(lambda);
    return this;
  }

  onError(lambda: (msg: any) => void): RestCaller {
    this._builder.onError(lambda);
    return this;
  }

  onFinish(lambda: (msg: any) => void): RestCaller {
    this._builder.onFinish(lambda);
    return this;
  }

  method(m: string): RestCaller {
    this._method = m;
    return this;
  }

  methodHead(): RestCaller {
    return this.method('head');
  }

  methodGet(): RestCaller {
    return this.method('get');
  }

  methodPost(): RestCaller {
    return this.method('post');
  }

  methodPut(): RestCaller {
    return this.method('put');
  }

  methodDelete(): RestCaller {
    return this.method('delete');
  }

  call(): RestCaller {

    switch (this._method) {
      case 'head':
        return this.head();
      case 'get':
        return this.get();
      case 'post':
        return this.post();
      case 'put':
        return this.put();
      case 'delete':
        return this.delete();
    }

    return this;
  }

  // ::: http-calls
  //
  head(): RestCaller {
    let uri = this._builder.getUri();

    let req = this._builder.getClient().head(uri, this.httpOptions());
    this._subscription = this.exchange(req);
    return this;
  }

  get(): RestCaller {
    let uri = this._builder.getUri();

    let req = this._builder.getClient().get(uri, this.httpOptions());
    this._subscription = this.exchange(req);
    return this;
  }

  post(): RestCaller {
    let uri = this._builder.getUri();

    let msg = this.requestMessage();
    let req = this._builder.getClient().post(uri, msg, this.httpOptions());
    this._subscription = this.exchange(req);
    return this;
  }

  put(): RestCaller {
    let uri = this._builder.getUri();

    let msg = this.requestMessage();
    let req = this._builder.getClient().put(uri, msg, this.httpOptions());

    this._subscription = this.exchange(req);
    return this;
  }

  delete(): RestCaller {
    let uri = this._builder.getUri();

    // options
    const options = {
      headers: this._builder._base._headers
    };

    let req = this._builder.getClient().delete(uri, this.httpOptions());
    this._subscription = this.exchange(req);
    return this;
  }

  // ::: internal caller
  //

  httpOptions() {
    let type = this._builder._base._responseType || "json";

    let options = <any>{
      headers: this._builder._base._headers,
    };

    switch (this._builder._base._observe) {
      case "body":
        options["observe"] = "body" as const;
        break;
      case "response":
        options["observe"] = "response" as const;
        break;
      case "events":
        options["observe"] = "events" as const;
        break;
      default:
        options["observe"] = "body" as const;
    }

    switch (this._builder._base._responseType) {
      case "json":
        options["responseType"] = "json" as const;
        break;
      case "text":
        options["responseType"] = "text" as const;
        break;
      case "blob":
        options["responseType"] = "blob" as const;
        break;
      case "arraybuffer":
        options["responseType"] = "arraybuffer" as const;
        break;
      default:
        options["responseType"] = "json" as const;
    }

    //let context: HttpContext ??
    //let reportProgress; : boolean
    //let withCredentials; ?? boolean ?

    return options;
  }

  protected exchange(req: Observable<Object>): Subscription {
    const call = req.pipe(
      catchError((err: HttpErrorResponse) => {
        try {
          this.callOnResponse(req, err);
          this.callOnError(req, err);
          this.callOnFinish(req, err);

        } catch (e) {
          console.debug(e);
        } finally {
          this.unsubscribe();
        }
        return EMPTY;
      })
    );

    return this.subscribe(req, call);
  }

  protected subscribe(req: any, call: Observable<any>) {
    let subs = call.subscribe(o => {
        try {
          this.callOnResponse(req, o);

          //  *** Uncomment after
          // if (this._builder.protocol && !this._builder.protocol.isSuccess(this, o)) {
          //   console.log("in-error");
          //   this.callOnError(req, o);
          // } else {
          //   this.callOnSuccess(req, o);
          // }

          this.callOnSuccess(req, o);

          this.callOnFinish(req, o);

        } catch (err) {
          console.error(err);
        } finally {
          this.unsubscribe();
        }
      }
    );

    return subs;
  }

  protected requestMessage() {
    let body = this._builder._body;
    return this._builder.protocol?.requestMessage(this, body) || body;
  }

  protected responseMessage(o: any) {
    return this._builder.protocol?.responseMessage(this, o) || o;
  }

  protected errorMessage(err: any) {
    return this._builder.protocol?.errorMessage(this, err) || err;
  }

  protected callOnResponse(req: any, o: any) {
    try {
      if (this._builder._base._onResponse) {
        this._builder._base._onResponse(o);
      }
    } catch (err) {
      console.debug(err);
    }
  }

  protected callOnError(req: any, o: any) {
    try {
      if (this._builder._base._onError) {
        this._builder._base._onError(this.errorMessage(o));
      }
    } catch (err) {
      console.debug(err);
    }
  }

  protected callOnSuccess(req: any, o: any) {
    try {
      if (this._builder._base._onSuccess) {
        this._builder._base._onSuccess(this.responseMessage(o));
      }

    } catch (err) {
      console.debug(err);
    }
  }

  protected callOnFinish(req: any, o: any) {
    try {
      if (this._builder._base._onFinish) {
        this._builder._base._onFinish(o);
      }
    } catch (err) {
      console.debug(err);
    }
  }

  protected unsubscribe() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
