import { Permission as PermissionDto } from 'src/application/dtos/Permission';
import { Role as RoleDto } from '../../../application/dtos/Role';
import { Role as RoleEntity } from 'src/domain/entities/Role';

export interface Roleable {
  getById(id: number): RoleDto;
  getByIdList(role: number[]): RoleDto[];
  getPermissions(roles: number[]): PermissionDto[];
  toDto(role: RoleEntity): RoleDto;
  dtoList(roles: RoleEntity[]): RoleDto[];
}
