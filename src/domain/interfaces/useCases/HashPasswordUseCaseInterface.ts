

export interface HashPasswordUseCaseInterface {
    hash(password: string, salt: number): Promise<string>
    verify(password: string, passwordHash: string): Promise<boolean>
}