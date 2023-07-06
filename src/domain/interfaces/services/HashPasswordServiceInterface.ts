

export interface HashPasswordServiceInterface {
    readonly saltRounds: number
    readonly  bcrypt:any
    hash(password: string): Promise<string | false>
    verify(password: string, passwordHash: string): Promise<boolean>
}