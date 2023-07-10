export interface CheckUserPermissionsUseCaseInterface {
    check(route: string, method: string, token: string): Promise<boolean>
}