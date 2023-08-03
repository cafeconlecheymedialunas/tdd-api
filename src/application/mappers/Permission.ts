import { Permissionable as PermissionMaperable } from '../../domain/interfaces/mappers/Permissionable';
import { Permission as PermissionEntity } from '../../domain/entities/Permission';
import { Permission as PermissionDto } from '../dtos/Permission';

export class Permission implements PermissionMaperable {
  mapItem = (permission: PermissionEntity): PermissionDto => {
    return {
      id: permission.id,
      route: permission.route,
      method: permission.method,
    };
  };

  mapList = (permissions: PermissionEntity[]): PermissionDto[] => {
    const results = permissions.map((item: PermissionEntity) => this.mapItem(item));

    return results;
  };
}
