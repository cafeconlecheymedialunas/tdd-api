import { UserRequestParams } from '../../types/requestInputs';
import { UserDto } from '../../../application/dtos/User';

export interface Registerable {
  validate(email: string, password: string, name: string): void;
  register(user: UserRequestParams): Promise<UserDto | false>;
}
