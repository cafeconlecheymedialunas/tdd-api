import DataMapperInterface from '../../domain/interfaces/mappers/Userable';
import { RoleMockable } from '../../domain/interfaces/repositories/RoleMockable';
import { User as UserEntity } from '../../domain/entities/User';
import { User as UserDto } from '../dtos/User';
import { Role as RoleDto } from '../dtos/Role';

export class User implements DataMapperInterface {
  private readonly roleRepository;

  constructor(roleRepository: RoleMockable) {
    this.roleRepository = roleRepository;
  }

  private getRoles = async (roles: number[]): Promise<RoleDto[] | false> => {
    const selectedRoles = await Promise.all(
      roles.map(async (rol) => {
        return await this.roleRepository.getById(rol);
      }),
    );

    return selectedRoles.filter((result): result is RoleDto => result !== undefined) as RoleDto[] | false;
  };

  mapItem = async (user: UserEntity): Promise<UserDto | false> => {
    const selectedRoles = await this.getRoles(user.roles);

    if (!selectedRoles) return false;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      roles: selectedRoles,
    };
  };

  mapList = async (users: UserEntity[]): Promise<UserDto[] | false> => {
    const results = await Promise.all(
      users.map(async (item: UserEntity) => {
        const userDto = await this.mapItem(item);

        return userDto !== false ? userDto : undefined;
      }),
    );

    return results.filter((result): result is UserDto => result !== undefined) as UserDto[] | false;
  };
}
