export interface AuthorizationUseCaseInterface {
  authorize(route: string, method: string, token: string): Promise<boolean>;
}
