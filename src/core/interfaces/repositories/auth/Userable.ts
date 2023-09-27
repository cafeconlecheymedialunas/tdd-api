import { UserRequestParams } from 'core/types/requestInputs';
import { QueryFilter } from 'core/types/database';
import { User as UserDto } from 'core/dtos/auth/User';
import { Role as RoleDto } from 'core/dtos/auth/Role';
import { User as UserEntity } from 'core/entities/auth/User';
import {  User as UserModel } from 'infra/database/models/User';

export interface Userable {
  getAll(): Promise<UserDto[]>;
  filter(conditions: QueryFilter): Promise<UserDto[]>;
  create(user: UserRequestParams): Promise<UserDto>;
  delete(id: number): Promise<number>;
  update(id: number, user: UserRequestParams): Promise<UserDto>;
  getById(id: number): Promise<UserDto>;
  //getRoles(roles: number[]): RoleDto[];
  toDto(user: UserEntity | UserModel): UserDto;
  //dtoList(users: UserEntity[] | UserModel[]): UserDto[];
}
