import { User } from '../../entities/User';
import { UserDto } from '../../../application/dtos/User';
export default interface Userable {
  mapItem(user: User): Promise<UserDto | false>;
  mapList(users: User[]): Promise<UserDto[] | false>;
}
