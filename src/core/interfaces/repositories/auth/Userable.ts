import { UserRequestParams } from '../../../types/requestInputs';
import { QueryFilter } from '../../../types/database';
import { User as UserEntity } from '../../../entities/auth/User';

export interface Userable {
  getAll(): Promise<UserEntity[]>;
  filter(conditions: QueryFilter): Promise<UserEntity[]>;
  create(user: UserRequestParams): Promise<UserEntity>;
  delete(id: number): Promise<number>;
  update(id: number, user: UserRequestParams): Promise<UserEntity>;
  getById(id: number): Promise<UserEntity>;
  //getRoles(roles: number[]): RoleEntity[];
  toEntity(user: UserRequestParams): Promise<UserEntity>;
  userExist(email: string): Promise<boolean>
  //entityList(users: UserEntity[] | UserModel[]): UserEntity[];
}
