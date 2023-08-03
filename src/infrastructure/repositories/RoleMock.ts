import Roleable from '../../domain/interfaces/mappers/Roleable';
import { RoleMockable } from '../../domain/interfaces/repositories/RoleMockable';
import { Role as RoleEntity } from '../../domain/entities/Role';
import { Role as RoleDto } from '../../application/dtos/Role';
import { ROLES_DEFAULT } from './rolesDefault';
import { NotFoundException } from '../../domain/types/errors';

export class RoleMock implements RoleMockable {
  list: RoleEntity[] = ROLES_DEFAULT;
  collection = 'roles';
  private readonly roleDataMapper: Roleable;

  constructor(roleDataMapper: Roleable) {
    this.roleDataMapper = roleDataMapper;
  }

  /**
   * Retrieves a RoleDto by its ID from the list of roles.
   * @param {number} id - The ID of the role to retrieve.
   * @returns {RoleDto} - The RoleDto object if found, or false if not found.
   */
  getById = (id: number): RoleDto => {
    const role = this.getRoleIndex(id);

    const roleDto = this.roleDataMapper.mapItem(this.list[role]);

    return roleDto;
  };

  /**
   * Returns the index of a role in the list based on its ID.
   * @param {number} id - The ID of the role to search for.
   * @returns {number} - The index of the role in the list.
   * @throws {NotFoundException} - If the role with the given ID is not found in the list.
   */
  getRoleIndex = (id: number): number => {
    const indexRole = this.list.findIndex((item) => item.id === id);

    if (indexRole === -1) throw new NotFoundException(id, 'Role');

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
