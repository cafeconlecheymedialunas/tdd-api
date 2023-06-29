

export interface HashPasswordUseCaseInterface {
    hash(password: string) : Promise<string>
    verify(password:string, passwordHash:string) : boolean
}