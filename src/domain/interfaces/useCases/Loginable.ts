import { Payload } from '../../types/response';
export interface Loginable {
  login(email: string, password: string): Promise<object>;
  validate(email: string, password: string): void;
}
