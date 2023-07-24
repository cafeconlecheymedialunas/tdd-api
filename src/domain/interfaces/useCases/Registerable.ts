import { UserRequestParams } from '../../types/requestParams';
import { UserDto } from '../../../application/dtos/User';

export interface Registerable {
  register(user: UserRequestParams): Promise<UserDto | false>;
}
