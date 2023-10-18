import { Permissionable } from '../interfaces/repositories/auth/Permissionable';
import { Permission as PermissionEntity } from '../entities/auth/Permission';
import { PermissionRequestParams } from '../types/requestInputs';
import { Request } from 'express';

export class PermissionCrud {
  private readonly permissionRepo: Permissionable;

  constructor(PermissionRepository: Permissionable) {
    this.permissionRepo = PermissionRepository;
  }

  async create(req: Request): Promise<PermissionEntity> {

    const permission: PermissionRequestParams = req.body;

    this.validate(permission);

    const permissions = await this.permissionRepo.create(permission);

    return permissions;
  }

  async getAll(): Promise<PermissionEntity[]> {
    const permissions = await this.permissionRepo.getAll();

    return permissions;
  }

  async getById(req: Request): Promise<PermissionEntity> {

    const id = parseInt(req.params.id);

    const permission = await this.permissionRepo.getById(id);

    return permission;
  }

  async update(req: Request): Promise<PermissionEntity> {

    const id = parseInt(req.params.id);

    const permission: PermissionRequestParams = req.body

    this.validate(permission);

    const result = await this.permissionRepo.update(id, permission);

    return result;
  }

  async delete(req: Request): Promise<number> {
    const id = parseInt(req.params.id);

    const result = await this.permissionRepo.delete(id);

    return result;
  }

  private validate(permission: PermissionRequestParams): void {
    new PermissionEntity({
      route: permission.route,
      method: permission.method,
    });
  }
}
