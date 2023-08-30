import { Role as RoleEntity } from '#src/domain/entities/Role';
import { Role as RoleDto } from '#src/application/dtos/Role';

export interface Roleable {
  mapItem(role: RoleEntity): RoleDto;
  mapList(roles: RoleEntity[]): RoleDto[];
}
