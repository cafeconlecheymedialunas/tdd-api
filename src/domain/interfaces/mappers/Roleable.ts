import { Role as RoleEntity } from '#root/domain/entities/Role';
import { Role as RoleDto } from '#root/application/dtos/Role';

export interface Roleable {
  mapItem(role: RoleEntity): RoleDto;
  mapList(roles: RoleEntity[]): RoleDto[];
}
