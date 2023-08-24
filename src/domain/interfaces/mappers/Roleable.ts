import { Role as RoleEntity } from 'domain/entities/Role';
import { Role as RoleDto } from 'application/dtos/Role';

export interface Roleable {
  mapItem(role: RoleEntity): RoleDto;
  mapList(roles: RoleEntity[]): RoleDto[];
}
