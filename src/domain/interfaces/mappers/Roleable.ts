import { Role } from '../../entities/Role';
import { Role as RoleDto } from '../../../application/dtos/Role';

export default interface Roleable {
  mapItem(role: Role): Promise<RoleDto | false>;
  mapList(roles: Role[]): Promise<RoleDto[] | false>;
}
