import { Role as RoleEntity } from '../../entities/Role';
import { Role as RoleDto } from '../../../application/dtos/Role';

export default interface Roleable {
  mapItem(role: RoleEntity): RoleDto;
  mapList(roles: RoleEntity[]): RoleDto[];
}
