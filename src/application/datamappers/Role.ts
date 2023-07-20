import RoleDataMapperInterface from '../../domain/interfaces/datamappers/Roleable';
import { PermissionRepositoryInterface } from '../../domain/interfaces/repositories/PermissionMockable';
import { Role } from '../../domain/entities/Role';
import { PermissionDto } from '../dtos/Permission';
import { RoleDto } from '../dtos/Role';

export class RoleDataMapper implements RoleDataMapperInterface {
  private readonly permissionRepository;

  constructor(repository: PermissionRepositoryInterface) {
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
  mapItem = async (role: Role): Promise<RoleDto | false> => {
    const selectedPermissions = await this.getPermissions(role.permissions);

    if (!selectedPermissions) return false;
    return {
      id: role.id,
      name: role.name,
      permissions: selectedPermissions,
    };
  };
  mapList = async (roles: Role[]): Promise<RoleDto[] | false> => {
    const results = await Promise.all(
      roles.map(async (item: Role) => {
        const roleDto = await this.mapItem(item);

        return roleDto !== false ? roleDto : undefined;
      }),
    );

    return results.filter((result): result is RoleDto => result !== undefined) as RoleDto[] | false;
  };
}
