const INTERCEPT_METHODS = ["updateTarget", "updateSource", "callSource"];

export class CommonInterceptBindingBehavior {
  bind(
    binding: { [x: string]: any },
    scope: any,
    interceptor: { bind(arg0: any, arg1: string, arg2: any): any }
  ) {
    let i = INTERCEPT_METHODS.length;
    while (i--) {
      const method = INTERCEPT_METHODS[i];
      if (!binding[method]) {
        continue;
      }

      binding[`intercepted-${method}`] = binding[method];
      const update = binding[method].bind(binding);
      binding[method] = interceptor.bind(binding, method, update);
    }
  }

  unbind(binding: { [x: string]: null }, scope: any) {
    let i = INTERCEPT_METHODS.length;
    while (i--) {
      const method = INTERCEPT_METHODS[i];
      if (!binding[method]) {
        continue;
      }

      binding[method] = binding[`intercepted-${method}`];
      binding[`intercepted-${method}`] = null;
    }
  }
}
