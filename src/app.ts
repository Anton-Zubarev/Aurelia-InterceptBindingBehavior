import { observable } from "aurelia-framework";

export class App {
  firstName = "";
  lastName = "";
  @observable value = "<John>Doe";
  intercepted = [];

  myFunc = (
    method: string,
    update: (arg0?: string) => void,
    value?: string
  ) => {
    // log the intercepted binding method.
    let info = {
      color: "#888",
      method: method,
      value: value
    };

    this.intercepted.splice(0, 0, info);
    // call the intercepted binding method.
    update(value);
    this.value = `<${this.firstName}>${this.lastName}`;
  };

  valueChanged(n?: string, o?: string) {
    const gr = /<(?<key>.*)>(?<value>.*)/g.exec(this.value)?.groups;
    this.firstName = gr?.key || "";
    this.lastName = gr?.value || "";
  }
  constructor() {
    this.valueChanged();
  }

  clear() {
    this.value = "<rrr>tttt";
    //this.firstName = "";
    //this.lastName = "";
  }
}
