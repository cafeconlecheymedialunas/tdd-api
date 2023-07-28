import { Permission } from '../../domain/entities/Permission';

export class Role {
  id: number;
  name: string;
  permissions: Permission[];

  constructor(name: string, id: number, permissions: Permission[]) {
    this.name = name;

    this.id = id;

    this.permissions = permissions;
  }
}
