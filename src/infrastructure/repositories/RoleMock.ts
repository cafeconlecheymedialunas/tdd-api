import Roleable from '../../domain/interfaces/mappers/Roleable';
import { RoleMockable } from '../../domain/interfaces/repositories/RoleMockable';
import { Role } from '../../domain/entities/Role';
import { Role as RoleDto } from '../../application/dtos/Role';
import { Mock } from './Mock';
import { ROLES_DEFAULT } from './roles';

export class RoleMock extends Mock implements RoleMockable {
  list: Role[] = ROLES_DEFAULT;
  collection = 'roles';
  dataMapper: Roleable;

  constructor(dataMapper: Roleable) {
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
