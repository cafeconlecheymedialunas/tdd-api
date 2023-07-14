import { RoleDto } from '../../../application/dtos/RoleDto';
import { UserDto } from '../../../application/dtos/UserDto';
import { User } from '../../entities/User.entity';

export default interface UserDataMapperInterface {
  getRoles(roles: number[]): Promise<RoleDto[] | false>;
  mapItem(user: User): Promise<UserDto | false>;
  mapList(users: User[]): Promise<UserDto[] | false>;
}
