import { UserRequestParams } from '../../types/requestParams';
import { QueryFilter } from '../../types/response';
import { UserDto } from '../../../application/dtos/User';

export interface UserMockable {
  getAll(): Promise<UserDto[] | false>;
  filter(conditions: QueryFilter[]): Promise<UserDto[]>;
  add(user: UserRequestParams): Promise<UserDto | false>;
  delete(id: number): Promise<boolean>;
  update(id: number, user: UserRequestParams): Promise<UserDto | false>;
  getById(id: number): Promise<UserDto | false>;
}
