import { Userable } from '../interfaces/repositories/auth/Userable';
import { User as UserEntity } from '../entities/auth/User';
import { UserRequestParams } from '../types/requestInputs';

export class UserCrud {
  private readonly userRepo: Userable;

  constructor(UserRepository: Userable) {
    this.userRepo = UserRepository;
  }

  async getAll (): Promise<UserEntity[]>  {
    const users = await this.userRepo.getAll();

    return users;
  };

  async getById(id: number): Promise<UserEntity> {
    const user = await this.userRepo.getById(id);

    return user;
  };

  async update(id: number, user: UserRequestParams): Promise<UserEntity> {
    const result = await this.userRepo.update(id, user);

    return result;
  };

  async delete  (id: number): Promise<number> {
    const result = await this.userRepo.delete(id);

    return result;
  };
}
