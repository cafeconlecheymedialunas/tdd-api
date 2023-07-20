import RoleDataMapperInterface from '../../domain/interfaces/datamappers/Roleable';
import { RoleRepositoryInterface } from '../../domain/interfaces/repositories/RoleMockable';
import { Role } from '../../domain/entities/Role';
import { RoleDto } from '../../application/dtos/Role';
import { MockRepository } from './MockRepository';
import { ROLES } from './roles';

export class RoleMockRepository extends MockRepository implements RoleRepositoryInterface {
  list: Role[] = ROLES;
  collection = 'roles';
  dataMapper: RoleDataMapperInterface;

  constructor(dataMapper: RoleDataMapperInterface) {
    super();

    this.dataMapper = dataMapper;
  }

  getById = async (id: number): Promise<RoleDto | false> => {
    const role = this.list.find((item) => item.id === id);

    if (!role) return false;

    const roleDto = await this.dataMapper.mapItem(role);

    if (!roleDto) return false;

    return roleDto;
  };

  getByIdList = async (ids: number[]): Promise<RoleDto[] | false> => {
    const roles = this.list.filter((item) => {
      return ids.indexOf(item.id) != -1;
    });

    const rolesDto = await this.dataMapper.mapList(roles);

    if (!rolesDto) return false;

    return rolesDto;
  };
}
