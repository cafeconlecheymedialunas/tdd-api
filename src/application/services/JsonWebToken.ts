/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonWebTokenable } from '../../domain/interfaces/services/JsonWebTokenable';
import { DecodedToken, Payload } from '../../domain/types/responseOutputs';
import { AuthenticationTokenMissingException, ClientException } from '../../domain/types/errors';
import config from '../../config';
import { TokenExpiredError } from 'jsonwebtoken';

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
   * @throws {AuthenticationTokenMissingException} If the token is invalid.
   * @throws {TokenExpiredError} If token is expired
   * @returns {Promise<object>} The decoded token payload.
   */
  verifyToken = async (token: string): Promise<DecodedToken> => {
    const decodedData = (await this.jwtLibrary.verify(token, config.SECRET_KEY)) as DecodedToken;

    const currentTime = Math.floor(Date.now() / 1000);

    if (Math.floor(decodedData.expiresIn.getDate() / 1000) < currentTime) {
      throw new TokenExpiredError('Token is expired', decodedData.expiresIn);
    }
    if (!decodedData.id) throw new AuthenticationTokenMissingException();

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
