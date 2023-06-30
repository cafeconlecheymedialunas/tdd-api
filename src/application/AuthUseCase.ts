import { UserRepositoryInterface } from "../domain/interfaces/repositories/UserRepositoryInterface";
import { HashPasswordServiceInterface } from "../domain/interfaces/services/HashPasswordServiceInterface";
import { JwtGenerateServiceInterface } from "../domain/interfaces/services/JwtGenerateServiceInterface";
import { HttpCustomResponse } from "../domain/types/http-response";
import { HashPasswordService } from "./services/HashPasswordService";

export class AuthUseCase {
  private readonly repository: UserRepositoryInterface
  private readonly hashService: HashPasswordServiceInterface
  private readonly jwt:JwtGenerateServiceInterface
  
  constructor(repository: UserRepositoryInterface, hashService: HashPasswordServiceInterface, jwt: JwtGenerateServiceInterface) {
    this.repository = repository
    this.hashService = hashService
    this.jwt = jwt
  }

  async login(email: string, password: string): Promise<HttpCustomResponse> {
    const user = await this.repository.getUserByEmail(email);
    console.log(user)
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