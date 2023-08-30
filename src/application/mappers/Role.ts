import { Roleable as RoleMapperable } from '#src/domain/interfaces/mappers/Roleable';
import { PermissionMockable } from '#src/domain/interfaces/repositories/PermissionMockable';
import { Role as RoleEntity } from '#src/domain/entities/Role';
import { Permission as PermissionDto } from '#src/application/dtos/Permission';
import { Role as RoleDto } from '#src/application/dtos/Role';


export class Role implements RoleMapperable {
  private readonly permissionRepository;

  /**
   * Creates an instance of the Role class.
   * @param {PermissionMockable} permissionRepository - Permission repository.
   */
  constructor(permissionRepository: PermissionMockable) {
    this.permissionRepository = permissionRepository;
  }

  /**
   * Get permissions from an array of role IDs.
   * @param {number[]} roles - Array of role IDs.
   * @returns {PermissionDto[]} - Array of PermissionDto objects.
   */
  getPermissions = (roles: number[]): PermissionDto[] => {
    const selectedPermissions = this.permissionRepository.getByIdList(roles);

    return selectedPermissions;
  };

  /**
   * Converts a RoleEntity object into a RoleDto object with corresponding permissions.
   * @param {RoleEntity} role - RoleEntity object.
   * @return {RoleDto} - Resulting RoleDto object.
   */
  mapItem = (role: RoleEntity): RoleDto => {
    const selectedPermissions = this.getPermissions(role.permissions);

    return {
      id: role.id,
      name: role.name,
      permissions: selectedPermissions,
    };
  };

  /**
   * Converts a list of RoleEntity objects into a list of RoleDto objects.
   * @param {RoleEntity[]} roles - List of RoleEntity objects.
   * @return {RoleDto[]} - Resulting list of RoleDto objects.
   */
  mapList = (roles: RoleEntity[]): RoleDto[] => {
    const results = roles.map((item: RoleEntity) => this.mapItem(item));

    return results;
  };
}
