import { JsonWebTokenServiceInterface } from '../../domain/interfaces/services/JsonWebTokenServiceInterface';
import { Payload } from '../../domain/types/response';
import config from '../../config';
import { ClientError } from '../../infraestructure/utils';
export class JsonWebTokenService implements JsonWebTokenServiceInterface {
  private jwt;
  constructor(jwt: any) {
    this.jwt = jwt;
  }
  async generateToken(payload: Payload, expiresIn: string): Promise<string> {
    const token = await this.jwt.sign(payload, config.SECRET_KEY, { expiresIn });
    return token;
  }
  async check(token: string): Promise<boolean> {
    const decoded = await this.jwt.verify(token, config.SECRET_KEY);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      throw new ClientError('Token has expired.');
    }
    return decoded.id ? true : false;
  }
  async decode(token: string): Promise<Payload> {
    if (token === '') {
      throw new ClientError('No se encontro', 400);
    }

    const decoded = await this.jwt.verify(token, config.SECRET_KEY);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      throw new ClientError('Token has expired.');
    }
    return {
      id: decoded.id,
      permissions: decoded.permissions,
    };
  }
}
