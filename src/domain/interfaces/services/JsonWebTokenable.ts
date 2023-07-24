import { Payload } from '../../types/response';

export interface JsonWebTokenable {
  generateToken(payload: object, expiresIn: string): Promise<string>;
  decode(token: string): Promise<Payload | void>;
}
