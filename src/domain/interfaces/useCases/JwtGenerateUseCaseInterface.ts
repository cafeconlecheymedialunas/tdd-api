import { Payload } from "../../types/response";

export interface JwtGenerateUseCaseInterface {
    generate(payload: Payload): Promise<string>;
    check(jwt:string): boolean; 
}