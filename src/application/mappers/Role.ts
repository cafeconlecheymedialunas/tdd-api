import Roleable from '../../domain/interfaces/mappers/Roleable';
import { PermissionMockable } from '../../domain/interfaces/repositories/PermissionMockable';
import { Role as RoleEntity } from '../../domain/entities/Role';
import { Permission as PermissionDto } from '../dtos/Permission';
import { Role as RoleDto } from '../dtos/Role';

export class Role implements Roleable {
  private readonly permissionRepository;

  constructor(permissionRepository: PermissionMockable) {
    this.permissionRepository = permissionRepository;
  }
  private getPermissions = (roles: number[]): PermissionDto[] | false => {
    const selectedPermissions = roles.map((rol) => {
      return this.permissionRepository.getById(rol);
    });

    return selectedPermissions.filter((result): result is PermissionDto => result !== undefined) as
      | PermissionDto[]
      | false;
  };

  mapItem = (role: RoleEntity): RoleDto | false => {
    const selectedPermissions = this.getPermissions(role.permissions);

    if (!selectedPermissions) return false;
    return {
      id: role.id,
      name: role.name,
      permissions: selectedPermissions,
    };
  };

  mapList = (roles: RoleEntity[]): RoleDto[] | false => {
    const results = roles.map((item: RoleEntity) => {
      const roleDto = this.mapItem(item);

      return roleDto !== false ? roleDto : undefined;
    });

    return results.filter((result): result is RoleDto => result !== undefined) as RoleDto[] | false;
  };
}
