import { Permission as PermissionEntity } from '#root/domain/entities/Permission';
import { Permission as PermissionDto } from '#root/application/dtos/Permission';

export interface Permissionable {
  mapItem(permission: PermissionEntity): PermissionDto;
  mapList(permissions: PermissionEntity[]): PermissionDto[];
}
