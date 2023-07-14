import { UserRepositoryInterface } from "../../domain/interfaces/repositories/UserRepositoryInterface"
import { HashPasswordServiceInterface } from "../../domain/interfaces/services/HashPasswordServiceInterface"
import { JsonWebTokenServiceInterface } from "../../domain/interfaces/services/JsonWebTokenServiceInterface"
import { HttpStatuses } from "../../domain/types/response"
import { ClientError, validateEmail } from "../../infraestructure/utils"

export class LoginUseCase {
  private readonly repository: UserRepositoryInterface
  private readonly hashService: HashPasswordServiceInterface
  private readonly jwt: JsonWebTokenServiceInterface
  constructor(repository: UserRepositoryInterface, hashService: HashPasswordServiceInterface, jwt: JsonWebTokenServiceInterface) {
    this.repository = repository
    this.hashService = hashService
    this.jwt = jwt
  }
  async login(email: string, password: string): Promise<object> {
    if (email == '') {
      throw new ClientError('Email is required')
    }
    if (!validateEmail(email)) {
      throw new ClientError('Is not a valid Email')
    }
    if (password == '') {
      throw new ClientError('Password is required')
    }
    const user = await this.repository.getUserByEmail(email);
    if (user === false) {
      throw new ClientError('The username or password does not match')
    }
    const passwordMatch = await this.hashService.verify(password, user.password);
    if (!passwordMatch) {
      throw new ClientError('The username or password does not match')
    }

    const payload = { id: user.id, permissions: [] }
    const token = await this.jwt.generateToken(payload, '1h');
    if (!token) throw new ClientError('The request could not be made, try again later.')

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