import { Permission } from '../../domain/entities/Permission.entity';

import PermissionDataMapperInterface from '../../domain/interfaces/datamappers/PermissionDataMapperInterface';

import { PermissionDto } from '../dtos/PermissionDto';

export class PermissionDtoMapper implements PermissionDataMapperInterface {
  mapItem(permission: Permission): PermissionDto | false {
    if (!permission) return false;
    return {
      id: permission.id,
      route: permission.route,
      method: permission.method,
    };
  }

  async mapList(permissions: Permission[]): Promise<PermissionDto[] | false> {
    const results = await Promise.all(
      permissions.map((item: Permission) => {
        const permissionDto = this.mapItem(item);

        return permissionDto !== false ? permissionDto : undefined;
      }),
    );

    return results.filter((result): result is PermissionDto => result !== undefined) as PermissionDto[] | false;
  }
}
