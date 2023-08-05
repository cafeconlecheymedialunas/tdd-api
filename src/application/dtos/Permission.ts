/**
 * This class represents a Permission DTO (Data Transfer Object)
 * which is returned by all methods from the Role Repository.
 */
export class Permission {
  id: number;
  route: string;
  method: string;

  constructor(route: string, method: string, id: number) {
    this.route = route;

    this.id = id;

    this.method = method;
  }
}
