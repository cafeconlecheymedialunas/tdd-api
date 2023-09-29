import { Permissionable } from '../interfaces/repositories/auth/Permissionable';
import { Permission as PermissionEntity } from '../entities/auth/Permission';
import { PermissionRequestParams } from '../types/requestInputs';

export class PermissionCrud {
  private readonly permissionRepo: Permissionable;

  constructor(PermissionRepository: Permissionable) {
    this.permissionRepo = PermissionRepository;
  }

  async create (permission: PermissionRequestParams): Promise<PermissionEntity> {
    const permissions = await this.permissionRepo.create(permission);

    return permissions;
  };

  async getAll(): Promise<PermissionEntity[]> {
    const permissions = await this.permissionRepo.getAll();

    return permissions;
  };

  async getById (id: number): Promise<PermissionEntity>  {
    const permission = await this.permissionRepo.getById(id);

    return permission;
  };

  async update(id: number, permission: PermissionRequestParams): Promise<PermissionEntity> {
    const result = await this.permissionRepo.update(id, permission);

    return result;
  };

  async delete(id: number): Promise<number> {
    const result = await this.permissionRepo.delete(id);

    return result;
  };
}
