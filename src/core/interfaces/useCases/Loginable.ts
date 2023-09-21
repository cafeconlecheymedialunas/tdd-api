export interface Loginable {
  login(email: string, password: string): Promise<string>;
  validate(email: string, password: string): void;
}
