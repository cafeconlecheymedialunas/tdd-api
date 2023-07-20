/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonWebTokenServiceInterface } from '../../domain/interfaces/services/JsonWebTokenServiceInterface';
import { Payload } from '../../domain/types/response';
import { AuthenticationTokenMissingException, ClientError } from '../../domain/types/errors';
import config from '../../config';

export class JsonWebTokenService implements JsonWebTokenServiceInterface {
  private jwt;

  constructor(jwt: any) {
    this.jwt = jwt;
  }

  generateToken = async (payload: Payload, expiresIn: string): Promise<string> => {
    const token = await this.jwt.sign(payload, config.SECRET_KEY, { expiresIn });

    return token;
  };

  verifyToken = async (token: string) => {
    if (token === '') {
      throw new ClientError();
    }

    const decoded = await this.jwt.verify(token, config.SECRET_KEY);

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) {
      throw new AuthenticationTokenMissingException();
    }
    return decoded;
  };

  decode = async (token: string): Promise<Payload> => {
    const decoded = await this.verifyToken(token);

    return {
      id: decoded.id,
      permissions: decoded.permissions,
    };
  };
}
