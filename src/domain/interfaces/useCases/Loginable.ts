import { Payload } from '../../types/response';
import { UserDto } from '../../../application/dtos/User';

export interface Loginable {
  login(email: string, password: string): Promise<object>;
  validate(email: string, password: string): void;
  sigIn(email: string, password: string): Promise<UserDto>;
  generateToken(payload: Payload): Promise<string>;
  generatePayload(user: UserDto): Payload;
}
