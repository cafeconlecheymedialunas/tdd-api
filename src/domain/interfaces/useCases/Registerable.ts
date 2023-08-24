import { UserRequestParams } from '#root/domain/types/requestInputs';
import { User as UserDto } from '#root/application/dtos/User';

export interface Registerable {
  validate(email: string, password: string, name: string): void;
  register(user: UserRequestParams): Promise<UserDto | false>;
}
