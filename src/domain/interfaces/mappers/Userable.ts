import { User as UserEntity } from '../../entities/User';
import { User as UserDto } from '../../../application/dtos/User';
export default interface Userable {
  mapItem(user: UserEntity): Promise<UserDto | false>;
  mapList(users: UserEntity[]): Promise<UserDto[] | false>;
}
