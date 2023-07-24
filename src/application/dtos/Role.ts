import { Roleable } from '../../domain/interfaces/dtos/Roleable';
import { Permission } from '../../domain/entities/Permission';

export class Role implements Roleable {
  id: number;
  name: string;
  permissions: Permission[];

  constructor(name: string, id: number, permissions: Permission[]) {
    this.name = name;

    this.id = id;

    this.permissions = permissions;
  }
}
