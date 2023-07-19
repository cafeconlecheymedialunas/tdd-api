import { UserDto } from '../../../application/dtos/UserDto';

import { UserRequestParams } from '../../types/requestParams';

export interface RegisterUseCaseInterface {
  register(user: UserRequestParams): Promise<UserDto | false>;
}
