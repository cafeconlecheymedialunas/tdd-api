import { Roleable } from '../../../core/interfaces/repositories/auth/Roleable';
import { Role as RoleEntity } from '../../../core/entities/auth/Role';
import { Role as RoleDto } from '../../../core/dtos/auth/Role';
import { ROLES_DEFAULT } from './rolesDefault';
import { NotFoundException } from '../../../core/errors';
import { Permissionable } from '../../../core/interfaces/repositories/auth/Permissionable';
import { Permission as PermissionDto } from '../../../core/dtos/auth/Permission';

export class Role implements Roleable {
  list: RoleEntity[] = ROLES_DEFAULT;
  collection = 'roles';
  private readonly permissionMockRepository: Permissionable;

  constructor(permissionMockRepository: Permissionable) {
    this.permissionMockRepository = permissionMockRepository;
  }

  /**
   * Get permissions from an array of role IDs.
   * @param {number[]} roles - Array of role IDs.
   * @returns {PermissionDto[]} - Array of PermissionDto objects.
   */
  getPermissions = (roles: number[]): PermissionDto[] => {
    const selectedPermissions = this.permissionMockRepository.getByIdList(roles);

    return selectedPermissions;
  };

  /**
   * Converts a RoleEntity object into a RoleDto object with corresponding permissions.
   * @param {RoleEntity} role - RoleEntity object.
   * @return {RoleDto} - Resulting RoleDto object.
   */
  toDto = (role: RoleEntity): RoleDto => {
    const selectedPermissions = this.getPermissions(role.getPermissions());

    const roleDto = new RoleDto({
      id: role.getId(),
      name: role.getName(),
      permissions: selectedPermissions,
    });

    return roleDto;
  };

  /**
   * Converts a list of RoleEntity objects into a list of RoleDto objects.
   * @param {RoleEntity[]} roles - List of RoleEntity objects.
   * @return {RoleDto[]} - Resulting list of RoleDto objects.
   */
  dtoList = (roles: RoleEntity[]): RoleDto[] => {
    const results = roles.map((item: RoleEntity) => this.toDto(item));

    return results;
  };

  /**
   * Retrieves a RoleDto by its ID from the list of roles.
   * @param {number} id - The ID of the role to retrieve.
   * @returns {RoleDto} - The RoleDto object if found, or false if not found.
   */
  getById = (id: number): RoleDto => {
    const role = this.getRoleIndex(id);

    const roleDto = this.toDto(this.list[role]);

    return roleDto;
  };

  /**
   * Returns the index of a role in the list based on its ID.
   * @param {number} id - The ID of the role to search for.
   * @returns {number} - The index of the role in the list.
   * @throws {NotFoundException} - If the role with the given ID is not found in the list.
   */
  getRoleIndex = (id: number): number => {
    const indexRole = this.list.findIndex((item) => item.getId() === id);

    if (indexRole === -1) throw new NotFoundException(id, 'Role');

    return indexRole;
  };

  /**
   * Retrieves a list of RoleDto objects based on the provided list of ids.
   * @param {number[]} ids - The list of Role ids to retrieve RoleDto objects for.
   * @returns {RoleDto[]} - An array of RoleDto objects if successful, or empty array if no roles were found.
   */
  getByIdList = (ids: number[]): RoleDto[] => {
    if (!ids || !ids.indexOf) return [];
    const roles = this.list.filter((item) => {
      return ids.indexOf(item.getId()) != -1;
    });

    const rolesDto = this.dtoList(roles);

    return rolesDto;
  };
}
