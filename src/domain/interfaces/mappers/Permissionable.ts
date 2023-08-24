import { Permission as PermissionEntity } from 'domain/entities/Permission';
import { Permission as PermissionDto } from 'application/dtos/Permission';

export interface Permissionable {
  mapItem(permission: PermissionEntity): PermissionDto;
  mapList(permissions: PermissionEntity[]): PermissionDto[];
}
