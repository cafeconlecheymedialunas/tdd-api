import { JwtGenerateUseCaseInterface } from "../domain/interfaces/useCases/JwtGenerateUseCaseInterface";
import { Payload } from "../domain/types/response";

export class JwtGenerateUseCase implements JwtGenerateUseCaseInterface {
    jwt
    constructor(jwt: any) {
        this.jwt = jwt;
    }

    generate(payload: Payload): string {
        const token = this.jwt.sign(payload, 'shhhhh');
        return token
    }

    check(jwt: string): boolean {
        const check = this.jwt.verify(jwt, 'shhhhh')
        if (!check) return false
        return true
    }

}