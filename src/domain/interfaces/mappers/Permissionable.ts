import { Permission as PermissionEntity } from '#src/domain/entities/Permission';
import { Permission as PermissionDto } from '#src/application/dtos/Permission';

export interface Permissionable {
  mapItem(permission: PermissionEntity): PermissionDto;
  mapList(permissions: PermissionEntity[]): PermissionDto[];
}
