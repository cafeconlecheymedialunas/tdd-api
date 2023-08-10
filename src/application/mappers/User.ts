import { Userable as UserMapperable } from '../../domain/interfaces/mappers/Userable';
import { RoleMockable } from '../../domain/interfaces/repositories/RoleMockable';
import { User as UserEntity } from '../../domain/entities/User';
import { User as UserDto } from '../dtos/User';
import { Role as RoleDto } from '../dtos/Role';

/**
 * Class representing a User mapper.
 */
export class User implements UserMapperable {
  private readonly roleRepository;

  /**
   * Creates an instance of the User class.
   * @param {RoleMockable} roleRepository - Role repository.
   */
  constructor(roleRepository: RoleMockable) {
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
