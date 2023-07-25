import { Role } from '../../entities/Role';
import { Role as RoleDto } from '../../../application/dtos/Role';

export default interface Roleable {
  mapItem(role: Role): RoleDto | false;
  mapList(roles: Role[]): RoleDto[] | false;
}
