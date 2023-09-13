import { UserRequestParams } from '../../types/requestInputs';
import { QueryFilter } from '../../types/requestInputs';
import { User as UserDto } from '../../dtos/User';
import { Role as RoleDto } from '../../dtos/Role';
import { User as UserEntity } from '../../entities/User';
export interface Userable {
  getAll(): Promise<UserDto[]>;
  filter(conditions: QueryFilter[]): Promise<UserDto[]>;
  add(user: UserRequestParams): Promise<UserDto>;
  delete(id: number): Promise<number>;
  update(id: number, user: UserRequestParams): Promise<UserDto>;
  getById(id: number): Promise<UserDto>;
  getRoles(roles: number[]): RoleDto[];
  toDto(user: UserEntity): UserDto;
  dtoList(users: UserEntity[]): UserDto[];
}
