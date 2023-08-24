import { Payload } from '#root/domain/types/responseOutputs';

export interface JsonWebTokenable {
  generateToken(payload: Payload, expiresIn: string): Promise<string>;
  decodeToken(token: string): Promise<Payload | void>;
}
