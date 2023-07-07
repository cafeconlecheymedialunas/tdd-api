

export interface HashPasswordServiceInterface {
    hash(password: string): Promise<string | false>
    verify(password: string, passwordHash: string): Promise<boolean>
}