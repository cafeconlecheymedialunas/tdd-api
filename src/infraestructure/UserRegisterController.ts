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
    this.service = new RegisterUserUseCase(new UserMockRepository())
    this.hash = new HashPasswordUseCase(bcrypt)
  }

  register ({ name, email, password }: { name: string, email: string, password: string }): Response {
    const newUser = this.service.register({ name, email, password })

    return this.res.status(200).json(newUser)
  }
}