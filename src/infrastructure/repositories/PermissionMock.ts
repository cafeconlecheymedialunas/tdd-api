import Permissionable from '../../domain/interfaces/mappers/Permissionable';
import { PermissionMockable } from '../../domain/interfaces/repositories/PermissionMockable';
import { Permission as PermissionEntity } from '../../domain/entities/Permission';
import { Condition, QueryFilter } from '../../domain/types/responseOutputs';
import { NotFoundException } from '../../domain/types/errors';
import { Permission as PermissionDto } from '../../application/dtos/Permission';
import { PERMISSIONS_DEFAULT } from './rolesDefault';

export class PermissionMock implements PermissionMockable {
  list = Object.values(PERMISSIONS_DEFAULT);
  collection = 'permissions';
  private readonly permissionDataMapper: Permissionable;

  constructor(permissionDataMapper: Permissionable) {
    this.permissionDataMapper = permissionDataMapper;
  }

  filter = (conditions: QueryFilter[]): PermissionDto[] => {
    const users = this.list.filter((item: PermissionEntity) =>
      conditions.every((condition) => {
        const { key, condition: conditionType, value } = condition;

        const propValue = item[key];

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

  getById = (id: number): PermissionDto => {
    const permission = this.getPermission(id);

    const permissionDto = this.permissionDataMapper.mapItem(permission);

    return permissionDto;
  };

  getPermission = (id: number): PermissionEntity => {
    const permission = this.list.find((item) => item.id === id);

    if (!permission) throw new NotFoundException(id, 'Permission');

    return permission;
  };

  getPermissionIndex = (id: number): number => {
    const indexPermission = this.list.findIndex((item) => item.id === id);

    if (!this.list[indexPermission].id) throw new NotFoundException(id, 'Permission');

    return indexPermission;
  };
}
