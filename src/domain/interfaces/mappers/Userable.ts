import { User as UserEntity } from 'domain/entities/User';
import { User as UserDto } from 'application/dtos/User';

export interface Userable {
  mapItem(user: UserEntity): UserDto;
  mapList(users: UserEntity[]): UserDto[];
}
