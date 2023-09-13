export interface Loginable {
  login(email: string, password: string): Promise<object>;
  validate(email: string, password: string): void;
}
