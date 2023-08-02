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
  getPermissions = (roles: number[]): PermissionDto[] => {
    const selectedPermissions = this.permissionRepository.getByIdList(roles);

    return selectedPermissions;
  };

  mapItem = (role: RoleEntity): RoleDto => {
    const selectedPermissions = this.getPermissions(role.permissions);

    return {
      id: role.id,
      name: role.name,
      permissions: selectedPermissions,
    };
  };

  mapList = (roles: RoleEntity[]): RoleDto[] => {
    const results = roles.map((item: RoleEntity) => this.mapItem(item));

    return results;
  };
}
