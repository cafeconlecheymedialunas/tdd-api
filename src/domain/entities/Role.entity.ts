export class Role {
  name: string;
  id: number;
  permissions: number[];
  [key: string]: any;
  constructor(id: number, name: string, permissions: number[]) {
    this.name = name;

    this.id = id;

    this.permissions = permissions;
  }
}
