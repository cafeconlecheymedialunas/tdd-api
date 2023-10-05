import { Roleable } from '../interfaces/repositories/auth/Roleable';
import { Role as RoleEntity } from '../entities/auth/Role';
import { RoleRequestParams } from '../types/requestInputs';

export class RoleCrud {
  private readonly roleRepo: Roleable;

  constructor(RoleRepository: Roleable) {
    this.roleRepo = RoleRepository;
  }

  async create(role: RoleRequestParams): Promise<RoleEntity> {
    const roles = await this.roleRepo.create(role);

    return roles;
  }

  async getAll(): Promise<RoleEntity[]> {
    const roles = await this.roleRepo.getAll();

    return roles;
  }

  async getById(id: number): Promise<RoleEntity> {
    const role = await this.roleRepo.getById(id);

    return role;
  }

  async update(id: number, role: RoleRequestParams): Promise<RoleEntity> {
    const result = await this.roleRepo.update(id, role);

    return result;
  }

  async delete(id: number): Promise<number> {
    const result = await this.roleRepo.delete(id);

    return result;
  }
}
