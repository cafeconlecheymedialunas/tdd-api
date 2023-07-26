/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonWebTokenable } from '../../domain/interfaces/services/JsonWebTokenable';
import { Payload } from '../../domain/types/response';
import { AuthenticationTokenMissingException, ClientException } from '../../domain/types/errors';
import config from '../../config';

export class JsonWebToken implements JsonWebTokenable {
  private readonly jwt;

  constructor(jwt: any) {
    this.jwt = jwt;
  }

  /**
   * Generates a JWT token with the given payload and expiration time.
   * @param {Payload} payload - The payload to include in the token.
   * @param {string} expiresIn - The expiration time for the token.
   * @returns {Promise<string>} - A promise that resolves to the generated token.
   */
  generateToken = async (payload: Payload, expiresIn: string): Promise<string> => {
    const token = await this.jwt.sign(payload, config.SECRET_KEY, { expiresIn });

    return token;
  };

  /**
   * Verifies the authenticity and validity of a given token.
   * @param {string} token - The token to be verified.
   * @throws {ClientException} If the token is empty.
   * @throws {AuthenticationTokenMissingException} If the token has expired.
   * @returns {Promise<object>} The decoded token payload.
   */
  private verifyToken = async (token: string) => {
    if (token === '') {
      throw new ClientException();
    }

    const decoded = await this.jwt.verify(token, config.SECRET_KEY);

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) {
      throw new AuthenticationTokenMissingException();
    }
    return decoded;
  };

  /**
   * Decodes a token and returns the payload.
   * @param {string} token - The token to decode.
   * @returns {Promise<Payload>} - A promise that resolves to the decoded payload.
   */
  decode = async (token: string): Promise<Payload> => {
    const decoded = await this.verifyToken(token);

    return {
      id: decoded.id,
      permissions: decoded.permissions,
    };
  };
}
