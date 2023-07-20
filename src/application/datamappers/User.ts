import DataMapperInterface from '../../domain/interfaces/datamappers/UserDataMapperInterface';
import { RoleRepositoryInterface } from '../../domain/interfaces/repositories/RoleRepositoryInterface';
import { User } from '../../domain/entities/User';
import { UserDto } from '../dtos/User';
import { RoleDto } from '../dtos/Role';

export class UserDataMapper implements DataMapperInterface {
  private readonly roleRepository;

  constructor(repository: RoleRepositoryInterface) {
    this.roleRepository = repository;
  }

  getRoles = async (roles: number[]): Promise<RoleDto[] | false> => {
    const selectedRoles = await Promise.all(
      roles.map(async (rol) => {
        return await this.roleRepository.getById(rol);
      }),
    );

    return selectedRoles.filter((result): result is RoleDto => result !== undefined) as RoleDto[] | false;
  };

  mapItem = async (user: User): Promise<UserDto | false> => {
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

  mapList = async (users: User[]): Promise<UserDto[] | false> => {
    const results = await Promise.all(
      users.map(async (item: User) => {
        const userDto = await this.mapItem(item);

        return userDto !== false ? userDto : undefined;
      }),
    );

    return results.filter((result): result is UserDto => result !== undefined) as UserDto[] | false;
  };
}
