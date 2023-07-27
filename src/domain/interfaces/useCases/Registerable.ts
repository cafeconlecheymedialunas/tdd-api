import { UserRequestParams } from '../../types/requestParams';
import { UserDto } from '../../../application/dtos/User';

export interface Registerable {
  validate(email: string, password: string, name: string): void;
  register(user: UserRequestParams): Promise<UserDto | false>;
}
