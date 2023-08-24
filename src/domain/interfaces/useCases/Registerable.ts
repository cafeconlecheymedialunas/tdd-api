import { UserRequestParams } from 'domain/types/requestInputs';
import { User as UserDto } from 'application/dtos/User';

export interface Registerable {
  validate(email: string, password: string, name: string): void;
  register(user: UserRequestParams): Promise<UserDto | false>;
}
