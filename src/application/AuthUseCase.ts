import { UserRepositoryInterface } from "../domain/interfaces/repositories/UserRepositoryInterface";
import { HashPasswordUseCaseInterface } from "../domain/interfaces/useCases/HashPasswordUseCaseInterface";
import { HttpCustomResponse } from "../domain/types/http-response";
import { HashPasswordUseCase } from "./HashPasswordUseCase";

export class AuthUseCase {
  private readonly repository: UserRepositoryInterface
  private readonly hashService: HashPasswordUseCaseInterface

  constructor(repository: UserRepositoryInterface, hashService: HashPasswordUseCaseInterface) {
    this.repository = repository
  }

  login(email: string, password: string): Promise<HttpCustomResponse> {
    const isVerify = this.hashService.verify()
  }

}