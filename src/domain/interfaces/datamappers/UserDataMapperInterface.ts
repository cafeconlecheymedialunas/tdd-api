import { User } from '../../entities/User';
import { RoleDto } from '../../../application/dtos/Role';
import { UserDto } from '../../../application/dtos/User';
export default interface UserDataMapperInterface {
  getRoles(roles: number[]): Promise<RoleDto[] | false>;
  mapItem(user: User): Promise<UserDto | false>;
  mapList(users: User[]): Promise<UserDto[] | false>;
}
