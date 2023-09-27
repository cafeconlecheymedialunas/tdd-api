export class RolePermission {
  private roleId: number;
  private permissionId: number;
  private id?: number;

  constructor(rolePermission: { id?: number; roleId: number; permissionId: number }) {
    this.id = rolePermission.id;
    this.roleId = rolePermission.roleId;
    this.permissionId = rolePermission.permissionId;
  }

  public getId() {
    return this.id;
  }

  public getRoleId(): number {
    return this.roleId;
  }

  public getPermissionId(): number {
    return this.permissionId;
  }

  public setId(id: number) {
    this.id = id;
  }
  public setRoleId(roleId: number) {
    this.roleId = roleId;
  }

  public setPermissionId(permissionId: number) {
    this.permissionId = permissionId;
  }
}
