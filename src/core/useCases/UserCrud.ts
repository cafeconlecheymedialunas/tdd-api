import { Userable } from '../interfaces/repositories/auth/Userable';
import { User as UserDto } from '../dtos/auth/User';
import { UserRequestParams } from 'core/types/requestInputs';

export class UserCrud {
  private readonly userRepo: Userable;

  constructor(UserRepository: Userable) {
    this.userRepo = UserRepository;
  }

  getAll = async (): Promise<UserDto[]> => {
    const users = await this.userRepo.getAll();

    return users;
  };

  getById = async (id:number): Promise<UserDto> => {
    const user = await this.userRepo.getById(id);

    return user;
  };

  update = async (id:number,user:UserRequestParams): Promise<UserDto> => {
    const result = await this.userRepo.update(id,user);

    return result;
  };

  delete = async (id:number): Promise<number> => {
    const result = await this.userRepo.delete(id);

    return result;
  };
}
