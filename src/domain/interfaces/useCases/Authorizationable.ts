import { Request } from 'express';
import { Permission as PermissionEntity } from '../../entities/Permission';
import { Permission as PermissionDto } from '../../../application/dtos/Permission';
export interface Authorizationable {
  getRoutePermission(route: string, method: string): PermissionDto;
  getUserPermissions(token: string): Promise<PermissionEntity[]>;
  authorize(route: string, method: string, token: string): Promise<boolean>;
}
