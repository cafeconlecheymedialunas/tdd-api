import { Payload } from '../../types/response';

export interface JsonWebTokenServiceInterface {
  generateToken(payload: object, expiresIn: string): Promise<string>;
  decode(token: string): Promise<Payload | void>;
}
