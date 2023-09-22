import { Userable } from '../interfaces/repositories/auth/Userable';
import { User as UserDto } from '../dtos/auth/User';

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
