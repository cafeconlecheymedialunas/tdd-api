import { Permissionable as PermissionMapperable } from '#root/domain/interfaces/mappers/Permissionable';
import { Permission as PermissionEntity } from '#root/domain/entities/Permission';
import { Permission as PermissionDto } from '#root/application/dtos/Permission';

export class Permission implements PermissionMapperable {
  /**
   * Converts a PermissionEntity object into a PermissionDto object.
   * @param {PermissionEntity} permission - The PermissionEntity object to be mapped.
   * @returns {PermissionDto} - The resulting PermissionDto object.
   */
  mapItem = (permission: PermissionEntity): PermissionDto => {
    return {
      id: permission.id,
      route: permission.route,
      method: permission.method,
    };
  };

  /**
   * Converts a list of PermissionEntity objects into a list of PermissionDto objects.
   * @param {PermissionEntity[]} permissions - The list of PermissionEntity objects to be mapped.
   * @returns {PermissionDto[]} - The resulting list of PermissionDto objects.
   */
  mapList = (permissions: PermissionEntity[]): PermissionDto[] => {
    const results = permissions.map((item: PermissionEntity) => this.mapItem(item));

    return results;
  };
}
