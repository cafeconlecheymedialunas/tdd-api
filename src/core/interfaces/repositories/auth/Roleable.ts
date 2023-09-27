import { Permission as PermissionDto } from 'core/dtos/auth/Permission';
import { Role as RoleDto } from 'core/dtos/auth/Role';
import { Role as RoleEntity } from 'core/entities/auth/Role';
import { Role as RoleModel } from 'infra/database/models/Role';
import { QueryFilter } from 'core/types/database';
import { RoleRequestParams, UserRequestParams } from 'core/types/requestInputs';

export interface Roleable {
  getAll(): Promise<RoleDto[]>;
  filter(conditions: QueryFilter): Promise<RoleDto[]>;
  create(role: RoleRequestParams): Promise<RoleDto>;
  delete(id: number): Promise<number>;
  update(id: number, role: RoleRequestParams): Promise<RoleDto>;
  getById(id: number): Promise<RoleDto>;
  //getRoles(roles: number[]): RoleDto[];
  toDto(role: RoleEntity | RoleModel): RoleDto;
  //dtoList(roles: UserEntity[] | UserModel[]): UserDto[];
}
