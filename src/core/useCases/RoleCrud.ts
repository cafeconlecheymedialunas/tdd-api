import { Roleable } from '../interfaces/repositories/auth/Roleable';
import { Role as RoleDto } from '../dtos/auth/Role';
import { RoleRequestParams } from 'core/types/requestInputs';

export class RoleCrud {
  private readonly roleRepo: Roleable;

  constructor(RoleRepository: Roleable) {
    this.roleRepo = RoleRepository;
  }

  create = async (role:RoleRequestParams): Promise<RoleDto> => {
    const roles = await this.roleRepo.create(role);

    return roles;
  };

  getAll = async (): Promise<RoleDto[]> => {
    const roles = await this.roleRepo.getAll();

    return roles;
  };

  getById = async (id:number): Promise<RoleDto> => {
    const role = await this.roleRepo.getById(id);

    return role;
  };

  update = async (id:number,role:RoleRequestParams): Promise<RoleDto> => {
    const result = await this.roleRepo.update(id,role);

    return result;
  };

  delete = async (id:number): Promise<number> => {
    const result = await this.roleRepo.delete(id);

    return result;
  };
}
