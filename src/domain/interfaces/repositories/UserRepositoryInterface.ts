import { UserDto } from '../../../application/dtos/UserDto';

import { QueryFilter, UserRequestParams } from '../../types/requestParams';

export interface UserRepositoryInterface {
  getAll(): Promise<UserDto[] | false>;
  filter(conditions: QueryFilter[]): Promise<UserDto[]>;
  add(user: UserRequestParams): Promise<UserDto | false>;
  delete(id: number): Promise<boolean>;
  update(id: number, user: UserRequestParams): Promise<UserDto | false>;
  generateId(): number; // TODO
  getById(id: number): Promise<UserDto | false>;
}
