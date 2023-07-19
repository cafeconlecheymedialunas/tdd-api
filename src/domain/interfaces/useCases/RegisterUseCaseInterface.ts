import { UserRequestParams } from '../../types/requestParams';
import { UserDto } from '../../../application/dtos/UserDto';

export interface RegisterUseCaseInterface {
  register(user: UserRequestParams): Promise<UserDto | false>;
}
