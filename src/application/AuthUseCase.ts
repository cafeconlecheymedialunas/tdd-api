import { UserRepositoryInterface } from "../domain/interfaces/repositories/UserRepositoryInterface";
import { HashPasswordUseCaseInterface } from "../domain/interfaces/useCases/HashPasswordUseCaseInterface";
import { JwtGenerateUseCaseInterface } from "../domain/interfaces/useCases/JwtGenerateUseCaseInterface";
import { HttpCustomResponse } from "../domain/types/http-response";
import { HashPasswordUseCase } from "./HashPasswordUseCase";

export class AuthUseCase {
  private readonly repository: UserRepositoryInterface
  private readonly hashService: HashPasswordUseCaseInterface
  private readonly jwt:JwtGenerateUseCaseInterface
  
  constructor(repository: UserRepositoryInterface, hashService: HashPasswordUseCaseInterface, jwt: JwtGenerateUseCaseInterface) {
    this.repository = repository
    this.hashService = hashService
    this.jwt = jwt
  }

  async login(email: string, password: string): Promise<HttpCustomResponse> {
    const user = await this.repository.getUserByEmail(email);
    if (user === undefined) {
      return HttpCustomResponse.notFound()
    }

    const passwordMatch = await this.hashService.verify(password, user.password);
    if (!passwordMatch) {
      return HttpCustomResponse.forbidden()
    }
    const payload = { id:1, permissions:[]}
    const token = this.jwt.generate(payload, 'secret_key_random', '1h' );
    return HttpCustomResponse.ok(token);
  }

}