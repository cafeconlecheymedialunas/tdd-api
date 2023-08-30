import { UserRequestParams } from '#src/domain/types/requestInputs';
import { User as UserDto } from '#src/application/dtos/User';

export interface Registerable {
  validate(email: string, password: string, name: string): void;
  register(user: UserRequestParams): Promise<UserDto | false>;
}
