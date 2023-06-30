import { Payload } from "../../types/response";

export interface JwtGenerateUseCaseInterface {
    generate(payload: Payload,secret_key:string,expiresIn:string): string;
    check(jwt: string): boolean;
}