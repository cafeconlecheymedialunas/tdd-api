import { PermissionDto } from '../../../application/dtos/PermissionDto';

import { Permission } from '../../entities/Permission.entity';

export default interface PermissionDataMapperInterface {
  mapItem(permission: Permission): PermissionDto | false;
  mapList(permissions: Permission[]): Promise<PermissionDto[] | false>;
}
