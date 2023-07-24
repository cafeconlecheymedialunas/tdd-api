import { Permissionable } from '../../domain/interfaces/dtos/Permissionable';

export class Permission implements Permissionable {
  id: number;
  route: string;
  method: string;

  constructor(route: string, method: string, id: number) {
    this.route = route;

    this.id = id;

    this.method = method;
  }
}
