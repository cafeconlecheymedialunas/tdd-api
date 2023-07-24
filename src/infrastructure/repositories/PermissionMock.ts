import Permissionable from '../../domain/interfaces/mappers/Permissionable';
import { PermissionMockable } from '../../domain/interfaces/repositories/PermissionMockable';
import { Permission } from '../../domain/entities/Permission';
import { Condition, QueryFilter } from '../../domain/types/response';
import { ClientException } from '../../domain/types/errors';
import { Permission as PermissionDto } from '../../application/dtos/Permission';
import { Mock } from './Mock';
import { PERMISSIONS_DEFAULT } from './roles';

export class PermissionMock extends Mock implements PermissionMockable {
  list = PERMISSIONS_DEFAULT;
  collection = 'permissions';
  dataMapper: Permissionable;

  constructor(dataMapper: Permissionable) {
    super();

    this.dataMapper = dataMapper;
  }

  filter = (conditions: QueryFilter[]): PermissionDto[] => {
    const users = Object.values(this.list).filter((item: Permission) =>
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

    const dtos = this.dataMapper.mapList(users);

    if (dtos === false) return [];
    return dtos;
  };

  getByIdList = (ids: number[]): PermissionDto[] | false => {
    const permission = Object.values(this.list).filter((item) => {
      return ids.indexOf(item.id) != -1;
    });

    if (permission === undefined) throw new ClientException(400, 'nO SE PUDO OBTENER');

    const permissionDto = this.dataMapper.mapList(permission);

    if (permissionDto) return false;

    return permissionDto;
  };

  getById = (id: number): PermissionDto | false => {
    const permission = Object.values(this.list).find((item) => item.id === id);

    if (!permission) return false;

    const permissionDto = this.dataMapper.mapItem(permission);

    if (!permissionDto) return false;

    return permissionDto;
  };
}
