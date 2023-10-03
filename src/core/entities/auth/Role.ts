import { SerialId } from './SerialId';
import { Name } from './Name';
import { Permission as PermissionEntity } from './Permission';
import { hasCorrectMaxLength, hasCorrectMinLength, isNotEmpty } from './validaciones';

/**
 * Represents a Role. The 'permissions' property should store an array of Permission IDs.
 */
export class Role {
  private id?: SerialId;
  private name!: Name;
  private permissions!: PermissionEntity[];

  constructor(user: { id?: SerialId; name: Name; permissions: PermissionEntity[] }) {
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

  public getPermissions(){
    return this.permissions;
  }

  public setId(id: SerialId) {
    this.id = id;
  }

  public setName(name: Name) {
    this.name = name;
  }

  public setPermissions(permissions: PermissionEntity[]) {
    this.permissions = permissions;
  }
}
