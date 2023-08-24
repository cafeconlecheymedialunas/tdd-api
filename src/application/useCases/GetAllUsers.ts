import { UserMockable } from '#root/domain/interfaces/repositories/UserMockable';
import { User as UserDto } from '#root/application/dtos/User';

export class GetAllUsers {
  private readonly userRepo: UserMockable;

  constructor(UserRepository: UserMockable) {
    this.userRepo = UserRepository;
  }

  run = async (): Promise<UserDto[]> => {
    const users = await this.userRepo.getAll();

    return users;
  };
}
