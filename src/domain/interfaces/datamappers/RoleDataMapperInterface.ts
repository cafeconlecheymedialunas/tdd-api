import { RoleDto } from '../../../application/dtos/RoleDto';

import { Role } from '../../entities/Role';

export default interface RoleDataMapperInterface {
  mapItem(role: Role): Promise<RoleDto | false>;
  mapList(roles: Role[]): Promise<RoleDto[] | false>;
}
