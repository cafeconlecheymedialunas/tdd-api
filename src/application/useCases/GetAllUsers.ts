import { Userable } from '#src/domain/interfaces/repositories/Userable';
import { User as UserDto } from '#src/application/dtos/User';

export class GetAllUsers {
  private readonly userRepo: Userable;

  constructor(UserRepository: Userable) {
    this.userRepo = UserRepository;
  }

  run = async (): Promise<UserDto[]> => {
    const users = await this.userRepo.getAll();

    return users;
  };
}
