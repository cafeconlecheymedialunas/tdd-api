import Roleable from '../../domain/interfaces/mappers/Roleable';
import { RoleMockable } from '../../domain/interfaces/repositories/RoleMockable';
import { Role as RoleEntity } from '../../domain/entities/Role';
import { Role as RoleDto } from '../../application/dtos/Role';
import { Mock } from './Mock';
import { ROLES_DEFAULT } from './rolesDefault';

export class RoleMock extends Mock implements RoleMockable {
  list: RoleEntity[] = ROLES_DEFAULT;
  collection = 'roles';
  private readonly roleDataMapper: Roleable;

  constructor(roleDataMapper: Roleable) {
    super();

    this.roleDataMapper = roleDataMapper;
  }

  /**
   * Retrieves a RoleDto by its ID from the list of roles.
   * @param {number} id - The ID of the role to retrieve.
   * @returns {Promise<RoleDto | false>} - A promise that resolves to the RoleDto object if found, or false if not found.
   */
  getById = async (id: number): Promise<RoleDto | false> => {
    const role = this.list.find((item) => item.id === id);

    if (!role) return false;

    const roleDto = await this.roleDataMapper.mapItem(role);

    if (!roleDto) return false;

    return roleDto;
  };

  /**
   * Retrieves a list of RoleDto objects based on the provided list of ids.
   * @param {number[]} ids - The list of Role ids to retrieve RoleDto objects for.
   * @returns {Promise<RoleDto[] | false>} - A promise that resolves to an array of RoleDto objects if successful, or false if no roles were found.
   */
  getByIdList = async (ids: number[]): Promise<RoleDto[] | false> => {
    const roles = this.list.filter((item) => {
      return ids.indexOf(item.id) != -1;
    });

    const rolesDto = await this.roleDataMapper.mapList(roles);

    if (!rolesDto) return false;

    return rolesDto;
  };
}
