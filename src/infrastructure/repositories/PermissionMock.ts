import { Permissionable as PermissionMapperable } from 'domain/interfaces/mappers/Permissionable';
import { PermissionMockable } from 'domain/interfaces/repositories/PermissionMockable';
import { Permission as PermissionEntity } from 'domain/entities/Permission';
import { Condition, QueryFilter } from 'domain/types/requestInputs';
import { NotFoundException } from 'domain/types/errors';
import { Permission as PermissionDto } from 'application/dtos/Permission';
import { PERMISSIONS_DEFAULT } from './rolesDefault';

export class PermissionMock implements PermissionMockable {
  list = Object.values(PERMISSIONS_DEFAULT);
  collection = 'permissions';
  private readonly permissionDataMapper: PermissionMapperable;

  constructor(permissionDataMapper: PermissionMapperable) {
    this.permissionDataMapper = permissionDataMapper;
  }

  filter = (conditions: QueryFilter[]): PermissionDto[] => {
    const users = this.list.filter((item: PermissionEntity) =>
      conditions.every((condition) => {
        const { key, condition: conditionType, value } = condition;

        const propValue = item[key as keyof typeof item];

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

    const dtos = this.permissionDataMapper.mapList(users);

    return dtos;
  };

  getByIdList = (ids: number[]): PermissionDto[] => {
    const permission = this.list.filter((item) => {
      return ids.indexOf(item.id) != -1;
    });

    if (permission === undefined) throw new NotFoundException(ids[0], 'Permission');

    const permissionDto = this.permissionDataMapper.mapList(permission);

    return permissionDto;
  };

  /**
   * Retrieves a permission object by its ID if it exists and converts an entity to a PermissionDto.
   * @param {number} id - The ID of the permission to retrieve.
   * @returns {PermissionDto} - The PermissionDto object representing the permission.
   */
  getById = (id: number): PermissionDto => {
    const permission = this.getPermissionIndex(id);

    const permissionDto = this.permissionDataMapper.mapItem(this.list[permission]);

    return permissionDto;
  };

  /**
   * Get the index of a permission in the list based on its ID.
   * @param {number} id - The ID of the permission.
   * @returns {number} The index of the permission in the list.
   * @throws {NotFoundException} If the permission with the given ID is not found.
   */
  getPermissionIndex = (id: number): number => {
    const indexPermission = this.list.findIndex((item) => item.id === id);

    if (indexPermission === -1) throw new NotFoundException(id, 'Permission');

    return indexPermission;
  };
}
