import { UserRequestParams } from '#src/domain/types/requestInputs';
import { QueryFilter } from '#src/domain/types/requestInputs';
import { User as UserDto } from '#src/application/dtos/User';

export interface UserMockable {
  getAll(): Promise<UserDto[]>;
  filter(conditions: QueryFilter[]): Promise<UserDto[]>;
  add(user: UserRequestParams): Promise<UserDto>;
  delete(id: number): Promise<number>;
  update(id: number, user: UserRequestParams): Promise<UserDto>;
  getById(id: number): Promise<UserDto>;
}
