import { Permissionable } from '../interfaces/repositories/auth/Permissionable';
import { Permission as PermissionDto } from '../dtos/auth/Permission';
import { PermissionRequestParams } from 'core/types/requestInputs';

export class PermissionCrud {
  private readonly permissionRepo: Permissionable;

  constructor(PermissionRepository: Permissionable) {
    this.permissionRepo = PermissionRepository;
  }

  create = async (permission:PermissionRequestParams): Promise<PermissionDto> => {
    const permissions = await this.permissionRepo.create(permission);

    return permissions;
  };

  getAll = async (): Promise<PermissionDto[]> => {
    const permissions = await this.permissionRepo.getAll();

    return permissions;
  };

  getById = async (id:number): Promise<PermissionDto> => {
    const permission = await this.permissionRepo.getById(id);

    return permission;
  };

  update = async (id:number,permission:PermissionRequestParams): Promise<PermissionDto> => {
    const result = await this.permissionRepo.update(id,permission);

    return result;
  };

  delete = async (id:number): Promise<number> => {
    const result = await this.permissionRepo.delete(id);

    return result;
  };
}
