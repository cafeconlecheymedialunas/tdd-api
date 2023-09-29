import { Password } from "../../entities/auth/Password";

export interface Hashable {
  hash(password: Password): Promise<string>;
  verify(password: Password, passwordHash: string): Promise<boolean>;
}
