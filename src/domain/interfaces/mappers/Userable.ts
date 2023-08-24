import { User as UserEntity } from '#root/domain/entities/User';
import { User as UserDto } from '#root/application/dtos/User';

export interface Userable {
  mapItem(user: UserEntity): UserDto;
  mapList(users: UserEntity[]): UserDto[];
}
