import { Permission as PermissionEntity } from '../../entities/Permission';
import { Permission as PermissionDto } from '../../../application/dtos/Permission';

export default interface Permissionable {
  mapItem(permission: PermissionEntity): PermissionDto | false;
  mapList(permissions: PermissionEntity[]): PermissionDto[] | false;
}
