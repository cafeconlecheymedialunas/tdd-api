import { HashPasswordUseCaseInterface } from "../domain/interfaces/useCases/HashPasswordUseCaseInterface";

export class HashPasswordUseCase implements HashPasswordUseCaseInterface {
    bcrypt
    constructor(bcrypt: any) {
        this.bcrypt = bcrypt
    }
    async hash(password: string): Promise<string> {
        return await this.bcrypt.hash(password, 10);
    }

    async verify(password: string, hashedPassword: string): Promise<boolean> {
        return await this.bcrypt.compare(password, hashedPassword);
    }
}