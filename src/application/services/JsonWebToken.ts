/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonWebTokenable } from '../../domain/interfaces/services/JsonWebTokenable';
import { Payload } from '../../domain/types/responseOutputs';
import { AuthenticationTokenMissingException, ClientException } from '../../domain/types/errors';
import config from '../../config';

export class JsonWebToken implements JsonWebTokenable {
  private readonly jwtLibrary;

  constructor(jwtLibrary: any) {
    this.jwtLibrary = jwtLibrary;
  }

  /**
   * Generates a JWT token with the given payload and expiration time.
   * @param {Payload} payload - The payload to include in the token.
   * @param {string} expiresIn - The expiration time for the token.
   * @returns {Promise<string>} - A promise that resolves to the generated token.
   */
  generateToken = async (payload: Payload, expiresIn: string): Promise<string> => {
    const token = await this.jwtLibrary.sign(payload, config.SECRET_KEY, { expiresIn });

    if (!token) throw new ClientException(500, "It's impossible to generate the token.");
    return token;
  };

  /**
   * Verifies the authenticity and validity of a given token.
   * @param {string} token - The token to be verified.
   * @throws {ClientException} If the token is empty.
   * @throws {AuthenticationTokenMissingException} If the token has expired.
   * @returns {Promise<object>} The decoded token payload.
   */
  private verifyToken = async (token: string): Promise<any> => {
    const decodedData = await this.jwtLibrary.verify(token, config.SECRET_KEY);

    if (!decodedData.id) throw new ClientException(500, "It's impossible to verify the token.");

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedData.exp && decodedData.exp < currentTime) {
      throw new AuthenticationTokenMissingException();
    }
    return decodedData;
  };

  /**
   * Decodes a token and returns user data.
   * @param {string} token - The token to decode.
   * @returns {Promise<Payload>} - A promise that resolves to the decoded payload.
   */
  decodeToken = async (token: string): Promise<Payload> => {
    const decodedData = await this.verifyToken(token);

    return {
      id: decodedData.id,
      permissions: decodedData.permissions,
    };
  };
}
