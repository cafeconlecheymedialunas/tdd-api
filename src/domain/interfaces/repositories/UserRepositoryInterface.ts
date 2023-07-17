import { UserDto } from '../../../application/dtos/UserDto';

import { FilterCondition, UserInput } from '../../types/inputsParams';

export interface UserRepositoryInterface {
  getAll(): Promise<UserDto[] | false>;
  filter(conditions: FilterCondition[]): Promise<UserDto[] | false>;
  add(user: UserInput): Promise<UserDto | false>;
  delete(id: number): Promise<boolean>;
  update(id: number, user: UserInput): Promise<UserDto | false>;
  generateId(): number; // TODO
  getById(id: number): Promise<UserDto | false>;
}
