import { UserDto } from '../../../application/dtos/UserDto';

import { UserInput } from '../../types/inputsParams';

export interface RegisterUseCaseInterface {
  register(user: UserInput): Promise<UserDto | false>;
}
