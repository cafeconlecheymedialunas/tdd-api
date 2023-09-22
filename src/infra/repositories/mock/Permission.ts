import { Permissionable } from '../../../core/interfaces/repositories/auth/Permissionable';
import { Permission as PermissionEntity } from '../../../core/entities/auth/Permission';
import { Condition, QueryFilter } from '../../../core/types/requestInputs';
import { NotFoundException } from '../../../core/errors';
import { Permission as PermissionDto } from '../../../core/dtos/auth/Permission';
import { PERMISSIONS_DEFAULT } from './rolesDefault';

export class Permission implements Permissionable {
  list = Object.values(PERMISSIONS_DEFAULT);
  collection = 'permissions';

  /**
   * Converts a PermissionEntity object into a PermissionDto object.
   * @param {PermissionEntity} permission - The PermissionEntity object to be mapped.
   * @returns {PermissionDto} - The resulting PermissionDto object.
   */
  toDto = (permission: PermissionEntity): PermissionDto => {
    const permissionDto = new PermissionDto({
      id: permission.getId(),
      route: permission.getRoute(),
      method: permission.getMethod(),
    });

    return permissionDto;
  };

  /**
   * Converts a list of PermissionEntity objects into a list of PermissionDto objects.
   * @param {PermissionEntity[]} permissions - The list of PermissionEntity objects to be mapped.
   * @returns {PermissionDto[]} - The resulting list of PermissionDto objects.
   */
  dtoList = (permissions: PermissionEntity[]): PermissionDto[] => {
    const results = permissions.map((item: PermissionEntity) => this.toDto(item));

    return results;
  };

  filter = (conditions: QueryFilter[]): PermissionDto[] => {
    const users = this.list.filter((item: PermissionEntity) =>
      conditions.every((condition) => {
        const { key, condition: conditionType, value } = condition;

        const functionName = `get${key}`;

        const propValue = eval(`item.${functionName}()`);

        switch (conditionType) {
          case Condition.Equal:
            return propValue === value;
          case Condition.NotEqual:
            return propValue !== value;
          case Condition.GreaterThan:
            return propValue > value;
          case Condition.LessThan:
            return propValue < value;
          default:
            return true;
        }
      }),
    );

    const dtos = this.dtoList(users);

    return dtos;
  };

  getByIdList = (ids: number[]): PermissionDto[] => {
    const permission = this.list.filter((item) => {
      return ids.indexOf(item.getId()) != -1;
    });

    if (permission === undefined) throw new NotFoundException(ids[0], 'Permission');

    const permissionDto = this.dtoList(permission);

    return permissionDto;
  };

  /**
   * Retrieves a permission object by its ID if it exists and converts an entity to a PermissionDto.
   * @param {number} id - The ID of the permission to retrieve.
   * @returns {PermissionDto} - The PermissionDto object representing the permission.
   */
  getById = (id: number): PermissionDto => {
    const permission = this.getPermissionIndex(id);

    const permissionDto = this.toDto(this.list[permission]);

    return permissionDto;
  };

  /**
   * Get the index of a permission in the list based on its ID.
   * @param {number} id - The ID of the permission.
   * @returns {number} The index of the permission in the list.
   * @throws {NotFoundException} If the permission with the given ID is not found.
   */
  getPermissionIndex = (id: number): number => {
    const indexPermission = this.list.findIndex((item) => item.getId() === id);

    if (indexPermission === -1) throw new NotFoundException(id, 'Permission');

    return indexPermission;
  };
}
