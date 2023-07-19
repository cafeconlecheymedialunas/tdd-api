/* eslint-disable @typescript-eslint/no-explicit-any */
export class Permission {
  id: number;
  [key: string]: any;
  route: string;
  method: string;

  constructor(id: number, route: string, method: string) {
    this.id = id;

    this.route = route;

    this.method = method;
  }
}
