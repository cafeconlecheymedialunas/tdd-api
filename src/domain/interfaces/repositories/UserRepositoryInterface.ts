import { UserDto } from '../../../application/dtos/UserDto';
import { BasicExpression, UserInput } from '../../types/inputsParams';
import { User } from '../../entities/User.entity';
export interface UserRepositoryInterface {
  getAll(): Promise<UserDto[] | false>;
  filter(expressions: BasicExpression[]): Promise<UserDto[] | false>;
  add(user: UserInput): Promise<UserDto | false>;
  delete(id: number): Promise<boolean>;
  update(id: number, user: UserInput): Promise<UserDto | false>;
  generateId(): number; // TODO
  getUserByEmail(email: string): Promise<UserDto | false>;
  getById(id: number): Promise<UserDto | false>;
}
