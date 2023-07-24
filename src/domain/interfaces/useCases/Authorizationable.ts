export interface Authorizationable {
  authorize(route: string, method: string, token: string): Promise<boolean>;
}
