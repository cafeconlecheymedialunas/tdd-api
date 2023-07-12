import { Payload } from "../../types/response";
export interface JsonWebTokenServiceInterface {
    generateToken(payload: object, expiresIn: string): Promise<string>;
    check(jwt: string): Promise<boolean>;
    decode(token: string): Promise<Payload | void>
}