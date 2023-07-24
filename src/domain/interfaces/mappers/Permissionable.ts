import { Permission } from '../../entities/Permission';
import { Permission as PermissionDto } from '../../../application/dtos/Permission';

export default interface Permissionable {
  mapItem(permission: Permission): PermissionDto | false;
  mapList(permissions: Permission[]): PermissionDto[] | false;
}
