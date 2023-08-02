import { UserRequestParams } from '../../types/requestInputs';
import { QueryFilter } from '../../types/responseOutputs';
import { User as UserDto } from '../../../application/dtos/User';

export interface UserMockable {
  getAll(): Promise<UserDto[]>;
  filter(conditions: QueryFilter[]): Promise<UserDto[]>;
  add(user: UserRequestParams): Promise<UserDto>;
  delete(id: number): Promise<number>;
  update(id: number, user: UserRequestParams): Promise<UserDto>;
  getById(id: number): Promise<UserDto>;
}
