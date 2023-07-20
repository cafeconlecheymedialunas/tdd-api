import PermissionDataMapperInterface from '../../domain/interfaces/datamappers/Permissionable';
import { Permission } from '../../domain/entities/Permission';
import { PermissionDto } from '../dtos/Permission';

export class PermissionDataMapper implements PermissionDataMapperInterface {
  mapItem = (permission: Permission): PermissionDto | false => {
    if (!permission) return false;

    return {
      id: permission.id,
      route: permission.route,
      method: permission.method,
    };
  };

  mapList = async (permissions: Permission[]): Promise<PermissionDto[] | false> => {
    const results = await Promise.all(
      permissions.map((item: Permission) => {
        const permissionDto = this.mapItem(item);

        return permissionDto !== false ? permissionDto : undefined;
      }),
    );

    return results.filter((result): result is PermissionDto => result !== undefined) as PermissionDto[] | false;
  };
}
