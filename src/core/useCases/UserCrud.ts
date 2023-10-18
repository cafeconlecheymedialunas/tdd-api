import { Userable } from '../interfaces/repositories/auth/Userable';
import { User as UserEntity } from '../entities/auth/User';
import { UserRequestParams } from '../types/requestInputs';
import { Request } from 'express';
export class UserCrud {
  private readonly userRepo: Userable;

  constructor(UserRepository: Userable) {
    this.userRepo = UserRepository;
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepo.getAll();

    return users;
  }

  async getById(req: Request): Promise<UserEntity> {
    const id = parseInt(req.params.id);

    const user = await this.userRepo.getById(id);

    return user;
  }

  async update(req: Request): Promise<UserEntity> {
    const id = parseInt(req.params.id);

    const user = req.body;

    this.validate(user);

    const result = await this.userRepo.update(id, user);

    return result;
  }

  async delete(req: Request): Promise<number> {

    const id = parseInt(req.params.id);

    const result = await this.userRepo.delete(id);

    return result;
  }

  private validate(user: any): UserEntity {
    return new UserEntity({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      roles: user.roles,
    });
  }

}
