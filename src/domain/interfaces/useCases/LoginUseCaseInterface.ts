export interface LoginUseCaseInterface {
    login(email: string, password: string): Promise<object>
}