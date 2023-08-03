import { Userable as UserMapperable } from '../../domain/interfaces/mappers/Userable';
import { RoleMockable } from '../../domain/interfaces/repositories/RoleMockable';
import { User as UserEntity } from '../../domain/entities/User';
import { User as UserDto } from '../dtos/User';
import { Role as RoleDto } from '../dtos/Role';

export class User implements UserMapperable {
  private readonly roleRepository;

  constructor(roleRepository: RoleMockable) {
    this.roleRepository = roleRepository;
  }

  getRoles = (roles: number[]): RoleDto[] => {
    const selectedRoles = this.roleRepository.getByIdList(roles);

    return selectedRoles;
  };

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

  mapList = (users: UserEntity[]): UserDto[] => {
    const results = users.map((item: UserEntity) => this.mapItem(item));

    return results;
  };
}
