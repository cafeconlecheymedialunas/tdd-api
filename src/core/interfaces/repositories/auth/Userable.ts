import { UserRequestParams } from '../../../types/requestInputs';
import { QueryFilter } from '../../../types/database';
import { User as UserEntity } from '../../../entities/auth/User';
import { User as UserModel } from '../../../../infra/database/models/User';

export interface Userable {
  getAll(): Promise<UserEntity[]>;
  filter(conditions: QueryFilter): Promise<UserEntity[]>;
  create(user: UserRequestParams): Promise<UserEntity>;
  delete(id: number): Promise<number>;
  update(id: number, user: UserRequestParams): Promise<UserEntity>;
  getById(id: number): Promise<UserEntity>;
  //getRoles(roles: number[]): RoleEntity[];
  toEntity(user: UserModel): UserEntity;
  //entityList(users: UserEntity[] | UserModel[]): UserEntity[];
}
