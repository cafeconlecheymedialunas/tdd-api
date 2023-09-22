import { Permission as PermissionDto } from '../../dtos/Permission';
import { Role as RoleDto } from '../../dtos/Role';
import { Role as RoleEntity } from '../../entities/Role';

export interface Roleable {
  getById(id: number): RoleDto;
  getByIdList(role: number[]): RoleDto[];
  getPermissions(roles: number[]): PermissionDto[];
  toDto(role: RoleEntity): RoleDto;
  dtoList(roles: RoleEntity[]): RoleDto[];
}
