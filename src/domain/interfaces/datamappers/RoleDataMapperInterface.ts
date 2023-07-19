import { Role } from '../../entities/Role';
import { RoleDto } from '../../../application/dtos/RoleDto';

export default interface RoleDataMapperInterface {
  mapItem(role: Role): Promise<RoleDto | false>;
  mapList(roles: Role[]): Promise<RoleDto[] | false>;
}
