export interface Hashable {
  hash(password: string): Promise<string | false>;
  verify(password: string, passwordHash: string): Promise<boolean>;
}
