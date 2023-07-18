import { PermissionDto } from '../../application/dtos/PermissionDto';
import { Permission } from '../../domain/entities/Permission.entity';

import PermissionDataMapperInterface from '../../domain/interfaces/datamappers/PermissionDataMapperInterface';

import { PermissionRepositoryInterface } from '../../domain/interfaces/repositories/PermissionRepositoryInterface';
import { Condition, FilterCondition } from '../../domain/types/inputsParams';

import { PERMISSIONS_DEFAULT } from '../../domain/types/permissions';

import { ClientError } from '../../domain/types/response';

import { MockRepository } from './MockRepository';

export class PermissionMockRepository extends MockRepository implements PermissionRepositoryInterface {
  list = PERMISSIONS_DEFAULT;
  collection = 'permissions';
  dataMapper: PermissionDataMapperInterface;
  constructor(dataMapper: PermissionDataMapperInterface) {
    super();

    this.dataMapper = dataMapper;
  }

  async filter(conditions: FilterCondition[]): Promise<PermissionDto[]> {
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

    const dtos = await this.dataMapper.mapList(users);

    if (dtos === false) return [];
    return dtos;
  }
  async getByIdList(ids: number[]): Promise<PermissionDto[] | false> {
    const permission = Object.values(this.list).filter((item) => {
      return ids.indexOf(item.id) != -1;
    });

    if (permission === undefined) throw new ClientError(400, 'nO SE PUDO OBTENER');

    const permissionDto = await this.dataMapper.mapList(permission);

    if (permissionDto) return false;

    return permissionDto;
  }

  async getById(id: number): Promise<PermissionDto | false> {
    const permission = Object.values(this.list).find((item) => item.id === id);

    if (!permission) return false;

    const permissionDto = await this.dataMapper.mapItem(permission);

    if (!permissionDto) return false;

    return permissionDto;
  }
}
