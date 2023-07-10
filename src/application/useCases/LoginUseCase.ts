import { UserRepositoryInterface } from "../../domain/interfaces/repositories/UserRepositoryInterface";
import { HashPasswordServiceInterface } from "../../domain/interfaces/services/HashPasswordServiceInterface";
import { JsonWebTokenServiceInterface } from "../../domain/interfaces/services/JsonWebTokenServiceInterface";

export class LoginUseCase {
  private readonly repository: UserRepositoryInterface
  private readonly hashService: HashPasswordServiceInterface
  private readonly jwt: JsonWebTokenServiceInterface

  constructor(repository: UserRepositoryInterface, hashService: HashPasswordServiceInterface, jwt: JsonWebTokenServiceInterface) {
    this.repository = repository
    this.hashService = hashService
    this.jwt = jwt
  }

  async login(email: string, password: string): Promise<false | object> {
    const user = await this.repository.getUserByEmail(email);

    if (user === undefined) {
      return false
    }

    const passwordMatch = await this.hashService.verify(password, user.password);
    if (!passwordMatch) {
      return false
    }

    const payload = { id: user.id, permissions: [] }
    const token = this.jwt.generateToken(payload, '1h');

    return {
      token,
      payload: {
        id: user.id,
        permissions: [
          {
            "id": 1,
            "route": "products",
            "method": "POST"
          }
        ]
      }

    }
  }

}