/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonWebTokenServiceInterface } from '../../domain/interfaces/services/JsonWebTokenServiceInterface';
import { Payload } from '../../domain/types/response';
import { ClientError } from '../../domain/types/errors';
import config from '../../config';

export class JsonWebTokenService implements JsonWebTokenServiceInterface {
  private jwt;

  constructor(jwt: any) {
    this.jwt = jwt;
  }

  async generateToken(payload: Payload, expiresIn: string): Promise<string> {
    const token = await this.jwt.sign(payload, config.SECRET_KEY, { expiresIn });

    return token;
  }

  async verifyToken(token: string) {
    if (token === '') {
      throw new ClientError();
    }

    const decoded = await this.jwt.verify(token, config.SECRET_KEY);

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) {
      throw new ClientError();
    }
    return decoded;
  }

  async check(token: string): Promise<boolean> {
    const decoded = await this.verifyToken(token);

    return decoded.id ? true : false;
  }

  async decode(token: string): Promise<Payload> {
    const decoded = await this.verifyToken(token);

    return {
      id: decoded.id,
      permissions: decoded.permissions,
    };
  }
}
