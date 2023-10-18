import { SerialId } from './SerialId';
import { Name } from './Name';
import { Permission as PermissionEntity } from './Permission';
import { hasCorrectMaxLength, hasCorrectMinLength, isNotEmpty } from './validaciones';

/**
 * Represents a Role. The 'permissions' property should store an array of Permission IDs.
 */
export class Role {
  private id?: number;
  private name!: string;
  private permissions!: PermissionEntity[];

  constructor(user: { id?: number; name: string; permissions: PermissionEntity[] }) {
    if (user.id) {
      this.setId(user.id);
    }
    this.setName(user.name);
    this.setPermissions(user.permissions);
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getPermissions() {
    return this.permissions;
  }

  public setId(value: number) {
    const id = new SerialId(value)
    this.id = id.getValue();
  }

  public setName(value: string) {
    const name = new Name(value)
    this.name = name.getValue();
  }

  public setPermissions(permissions: PermissionEntity[]) {
    this.permissions = permissions;
  }
}
