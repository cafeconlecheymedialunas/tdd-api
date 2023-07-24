import Roleable from '../../domain/interfaces/mappers/Roleable';
import { PermissionMockable } from '../../domain/interfaces/repositories/PermissionMockable';
import { Role as RoleEntity } from '../../domain/entities/Role';
import { Permission as PermissionDto } from '../dtos/Permission';
import { Role as RoleDto } from '../dtos/Role';

export class Role implements Roleable {
  private readonly permissionRepository;

  constructor(repository: PermissionMockable) {
    this.permissionRepository = repository;
  }
  getPermissions = async (roles: number[]): Promise<PermissionDto[] | false> => {
    const selectedPermissions = await Promise.all(
      roles.map(async (rol) => {
        return await this.permissionRepository.getById(rol);
      }),
    );

    return selectedPermissions.filter((result): result is PermissionDto => result !== undefined) as
      | PermissionDto[]
      | false;
  };
  mapItem = async (role: RoleEntity): Promise<RoleDto | false> => {
    const selectedPermissions = await this.getPermissions(role.permissions);

    if (!selectedPermissions) return false;
    return {
      id: role.id,
      name: role.name,
      permissions: selectedPermissions,
    };
  };
  mapList = async (roles: RoleEntity[]): Promise<RoleDto[] | false> => {
    const results = await Promise.all(
      roles.map(async (item: RoleEntity) => {
        const roleDto = await this.mapItem(item);

        return roleDto !== false ? roleDto : undefined;
      }),
    );

    return results.filter((result): result is RoleDto => result !== undefined) as RoleDto[] | false;
  };
}
