import { Role } from '../../entities/Role';
import { RoleDto } from '../../../application/dtos/Role';

export default interface RoleDataMapperInterface {
  mapItem(role: Role): Promise<RoleDto | false>;
  mapList(roles: Role[]): Promise<RoleDto[] | false>;
}
