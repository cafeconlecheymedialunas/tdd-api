import { Permission } from '../../entities/Permission';
import { PermissionDto } from '../../../application/dtos/PermissionDto';

export default interface PermissionDataMapperInterface {
  mapItem(permission: Permission): PermissionDto | false;
  mapList(permissions: Permission[]): Promise<PermissionDto[] | false>;
}
