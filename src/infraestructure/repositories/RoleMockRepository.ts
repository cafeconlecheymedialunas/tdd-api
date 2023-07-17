import { RoleDto } from '../../application/dtos/RoleDto';

import { Role } from '../../domain/entities/Role.entity';

import RoleDataMapperInterface from '../../domain/interfaces/datamappers/RoleDataMapperInterface';

import { RoleRepositoryInterface } from '../../domain/interfaces/repositories/RoleRepositoryInterface';

import { MockRepository } from './MockRepository';

import { ROLES } from '../../domain/types/roles';

export class RoleMockRepository extends MockRepository implements RoleRepositoryInterface {
  list: Role[] = ROLES;
  collection = 'roles';
  dataMapper: RoleDataMapperInterface;
  constructor(dataMapper: RoleDataMapperInterface) {
    super();

    this.dataMapper = dataMapper;
  }

  async getById(id: number): Promise<RoleDto | false> {
    const role = this.list.find((item) => item.id === id);

    if (!role) return false;

    const roleDto = await this.dataMapper.mapItem(role);

    if (!roleDto) return false;

    return roleDto;
  }

  async getByIdList(ids: number[]): Promise<RoleDto[] | false> {
    const roles = this.list.filter((item) => {
      return ids.indexOf(item.id) != -1;
    });

    const rolesDto = await this.dataMapper.mapList(roles);

    if (!rolesDto) return false;

    return rolesDto;
  }
}
