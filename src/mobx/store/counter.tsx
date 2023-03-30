import { makeAutoObservable } from "mobx";

class Counter {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment(value: number) {
    this.count = this.count + value;
  }

  decrement(value: number) {
    this.count = this.count - value;
  }

}

export default new Counter();
