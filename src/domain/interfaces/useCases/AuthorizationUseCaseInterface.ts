export interface AuthorizationUseCaseInterface {
  check(route: string, method: string, token: string): Promise<boolean>;
}
