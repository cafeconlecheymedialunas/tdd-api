import Permissionable from '../../domain/interfaces/mappers/Permissionable';
import { Permission as PermissionEntity } from '../../domain/entities/Permission';
import { Permission as PermissionDto } from '../dtos/Permission';

export class Permission implements Permissionable {
  mapItem = (permission: PermissionEntity): PermissionDto | false => {
    if (!permission) return false;

    return {
      id: permission.id,
      route: permission.route,
      method: permission.method,
    };
  };

  mapList = async (permissions: PermissionEntity[]): Promise<PermissionDto[] | false> => {
    const results = await Promise.all(
      permissions.map((item: PermissionEntity) => {
        const permissionDto = this.mapItem(item);

        return permissionDto !== false ? permissionDto : undefined;
      }),
    );

    return results.filter((result): result is PermissionDto => result !== undefined) as PermissionDto[] | false;
  };
}
