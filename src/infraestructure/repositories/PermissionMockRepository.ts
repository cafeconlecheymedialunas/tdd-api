import { PermissionDto } from '../../application/dtos/PermissionDto';
import PermissionDataMapperInterface from '../../domain/interfaces/datamappers/PermissionDataMapperInterface';
import { PermissionRepositoryInterface } from '../../domain/interfaces/repositories/PermissionRepositoryInterface';
import { PERMISSIONS_DEFAULT } from '../../domain/types/permissions';
import { ClientError } from '../utils';
import { MockRepository } from './MockRepository';
export class PermissionMockRepository extends MockRepository implements PermissionRepositoryInterface {
  list = PERMISSIONS_DEFAULT;
  collection = 'permissions';
  dataMapper: PermissionDataMapperInterface;
  constructor(dataMapper: PermissionDataMapperInterface) {
    super();
    this.dataMapper = dataMapper;
  }

  async getByRouteMethod(route: string, method: string): Promise<PermissionDto | false> {
    const permission = Object.values(this.list).find(function (elem) {
      return elem.method === method && elem.route === route;
    });
    if (permission === undefined) throw new ClientError('nO SE PUDO OBTENER', 400);
    return permission;
  }

  async getByIdList(ids: number[]): Promise<PermissionDto[] | false> {
    const permission = Object.values(this.list).filter(function (item) {
      return ids.indexOf(item.id) != -1;
    });
    if (permission === undefined) throw new ClientError('nO SE PUDO OBTENER', 400);
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
