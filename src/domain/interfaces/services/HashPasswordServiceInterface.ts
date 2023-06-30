

export interface HashPasswordServiceInterface {
    hash(password: string, salt: number): Promise<string>
    verify(password: string, passwordHash: string): Promise<boolean>
}