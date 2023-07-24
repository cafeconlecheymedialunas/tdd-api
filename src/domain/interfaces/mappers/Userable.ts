import { User } from '../../entities/User';
import { Role as RoleDto } from '../../../application/dtos/Role';
import { UserDto } from '../../../application/dtos/User';
export default interface Userable {
  getRoles(roles: number[]): Promise<RoleDto[] | false>;
  mapItem(user: User): Promise<UserDto | false>;
  mapList(users: User[]): Promise<UserDto[] | false>;
}
