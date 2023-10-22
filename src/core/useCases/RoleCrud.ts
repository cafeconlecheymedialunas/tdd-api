import { Roleable } from '../interfaces/repositories/auth/Roleable';
import { Role as RoleEntity } from '../entities/auth/Role';
import { RoleRequestParams } from '../types/requestInputs';
import { Request } from 'express';

export class RoleCrud {
  private readonly roleRepo: Roleable;

  constructor(RoleRepository: Roleable) {
    this.roleRepo = RoleRepository;
  }

  async create(req: Request): Promise<RoleEntity> {

    const role: RoleRequestParams = req.body;

    this.validate(role);

    const roles = await this.roleRepo.create(role);

    return roles;
  }

  async getAll(): Promise<RoleEntity[]> {
    const roles = await this.roleRepo.getAll();

    return roles;
  }

  async getById(req: Request): Promise<RoleEntity> {

    const id = parseInt(req.params.id);

    const role = await this.roleRepo.getById(id);

    return role;
  }

  async update(req: Request): Promise<RoleEntity> {

    const role: RoleRequestParams = req.body;

    const id = parseInt(req.params.id);

    this.validate(role);

    const result = await this.roleRepo.update(id, role);

    return result;
  }

  async delete(req: Request): Promise<number> {
    const id = parseInt(req.params.id);

    const result = await this.roleRepo.delete(id);

    return result;
  }

  private validate(role: RoleRequestParams): void {
    new RoleEntity({
      name: role.name,
      permissions: role.permissions,
    });
  }
}
