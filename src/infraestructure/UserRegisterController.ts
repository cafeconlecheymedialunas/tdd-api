import { RegisterUserUseCase } from '../application/RegisterUserUseCase'
import { UserMockRepository } from '../domain/repositories/UserMockRepository'
import { HttpCustomResponse } from '../domain/types/http-response'
import { type Response } from 'express'
import bcrypt from "bcrypt"
import { HashPasswordUseCase } from '../application/HashPasswordUseCase'

export class UserRegisterController {
  private readonly service
  res
  private readonly hash
  constructor (res: Response) {
    this.res = res
    this.service = new RegisterUserUseCase(new UserMockRepository()) //TODO
    this.hash = new HashPasswordUseCase(bcrypt)

  }

  async register ({ name, email, password }: { name: string, email: string, password: string }): Promise<Response> {
    const passwordHash = await this.hash.hash(password)
    const newUser = this.service.register({ name, email, password: passwordHash })

    return this.res.status(200).json(newUser)
  }
}