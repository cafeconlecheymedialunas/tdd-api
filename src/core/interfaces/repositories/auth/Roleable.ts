import { Role as RoleEntity } from '../../../entities/auth/Role';
import { QueryFilter } from '../../../types/database';
import { RoleRequestParams } from '../../../types/requestInputs';

export interface Roleable {
  getAll(): Promise<RoleEntity[]>;
  filter(conditions: QueryFilter): Promise<RoleEntity[]>;
  create(role: RoleRequestParams): Promise<RoleEntity>;
  delete(id: number): Promise<number>;
  update(id: number, role: RoleRequestParams): Promise<RoleEntity>;
  getById(id: number): Promise<RoleEntity>;
  //getRoles(roles: number[]): RoleEntity[];
  //entityList(roles: UserEntity[] | UserModel[]): UserEntity[];
}
