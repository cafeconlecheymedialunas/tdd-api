import Roleable from '../../domain/interfaces/mappers/Roleable';
import { RoleMockable } from '../../domain/interfaces/repositories/RoleMockable';
import { Role as RoleEntity } from '../../domain/entities/Role';
import { Role as RoleDto } from '../../application/dtos/Role';
import { Mock } from './Mock';
import { ROLES_DEFAULT } from './rolesDefault';
import { NotFoundException } from '../../domain/types/errors';

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
   * @returns {RoleDto} - The RoleDto object if found, or false if not found.
   */
  getById = (id: number): RoleDto => {
    const role = this.getRole(id);

    const roleDto = this.roleDataMapper.mapItem(role);

    return roleDto;
  };

  getRole = (id: number): RoleEntity => {
    const role = this.list.find((item) => item.id === id);

    if (!role) throw new NotFoundException(id, 'Role');

    return role;
  };

  getRoleIndex = (id: number): number => {
    const indexRole = this.list.findIndex((item) => item.id === id);

    if (!this.list[indexRole].id) throw new NotFoundException(id, 'Role');

    return indexRole;
  };

  /**
   * Retrieves a list of RoleDto objects based on the provided list of ids.
   * @param {number[]} ids - The list of Role ids to retrieve RoleDto objects for.
   * @returns {RoleDto[]} - An array of RoleDto objects if successful, or empty array if no roles were found.
   */
  getByIdList = (ids: number[]): RoleDto[] => {
    const roles = this.list.filter((item) => {
      return ids.indexOf(item.id) != -1;
    });

    const rolesDto = this.roleDataMapper.mapList(roles);

    return rolesDto;
  };
}
