import { RoleDtoInterface } from '../../domain/interfaces/dtos/Roleable';
import { Permission } from '../../domain/entities/Permission';

export class RoleDto implements RoleDtoInterface {
  id: number;
  name: string;
  permissions: Permission[];

  constructor(name: string, id: number, permissions: Permission[]) {
    this.name = name;

    this.id = id;

    this.permissions = permissions;
  }
}
