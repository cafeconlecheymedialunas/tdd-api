import { Userable as UserMapperable } from '#src/domain/interfaces/mappers/Userable';
import { Roleable } from '#src/domain/interfaces/repositories/Roleable';
import { User as UserEntity } from '#src/domain/entities/User';
import { User as UserDto } from '#src/application/dtos/User';
import { Role as RoleDto } from '#src/application/dtos/Role';

export class User implements UserMapperable {
  private readonly roleRepository;

  constructor(roleRepository: Roleable) {
    this.roleRepository = roleRepository;
  }

  /**
   * Get roles from an array of role IDs.
   * @param {number[]} roles - Array of role IDs.
   * @returns {RoleDto[]} - Array of RoleDto objects.
   */
  getRoles = (roles: number[]): RoleDto[] => {
    const selectedRoles = this.roleRepository.getByIdList(roles);

    return selectedRoles;
  };

  /**
   * Converts a UserEntity object into a UserDto object.
   * @param {UserEntity} user - The UserEntity object to be mapped.
   * @returns {UserDto} - The resulting UserDto object.
   */
  mapItem = (user: UserEntity): UserDto => {
    const selectedRoles = this.getRoles(user.roles);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      roles: selectedRoles,
    };
  };

  /**
   * Converts a list of UserEntity objects into a list of UserDto objects.
   * @param {UserEntity[]} users - The list of UserEntity objects to be mapped.
   * @returns {UserDto[]} - The resulting list of UserDto objects.
   */
  mapList = (users: UserEntity[]): UserDto[] => {
    const results = users.map((item: UserEntity) => this.mapItem(item));

    return results;
  };
}
