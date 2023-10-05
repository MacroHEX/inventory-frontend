import {BehaviorSubject, Subscription} from "rxjs";

export class ArrayDataSubject<T> {

  // ::: vars
  //
  subject: BehaviorSubject<T[]>;
  subscription?: Subscription;

  // ::: constructor
  //
  constructor(data?: T[]) {
    this.subject = new BehaviorSubject<T[]>(data || []);

    this.initialize();
  }

  // ::: init
  //
  initialize() {
  }

  // ::: api
  //
  get data(): T[] {
    return this.subject.value;
  }

  set data(newData: T[]) {
    //this.subject = new BehaviorSubject<T[]>(newData || []);
    this.subject.value.splice(0, this.subject.value.length);
    this.subject.value.push(...newData);
    /*
    if(this.lambda) {
      this.subject.subscribe(this.lambda);
    }*/
    this.notifyChange();
  }

  index(item: T) {
    return this.subject.value.indexOf(item);
  }

  get(idx: number) {
    return this.subject.value[idx];
  }

  set(idx: number, item: T) {
    this.subject.value[idx] = item;
    this.notifyChange();
  }

  add(item: T) {
    this.subject.value.push(item);
    this.notifyChange();
  }

  addAll(items: T[]) {
    this.subject.value.push(...items || []);
    this.notifyChange();
  }

  remove(item: T) {
    let idx = this.subject.value.indexOf(item);
    if (idx > -1) {
      this.subject.value.splice(idx, 1);
      this.notifyChange();
    }
  }

  removeIndex(idx: number) {
    if (idx > -1) {
      this.subject.value.splice(idx, 1);
      this.notifyChange();
    }
  }

  removeAll() {
    this.subject.value.splice(0, this.subject.value.length);
    this.notifyChange();
  }

  subscribe(lambda: (data: any) => void) {
    this.subscription = this.subject.subscribe(lambda);
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  notifyChange() {
    this.subject.next(this.data);
  }
}
