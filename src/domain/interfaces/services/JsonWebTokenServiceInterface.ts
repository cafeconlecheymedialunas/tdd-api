import { Permission } from "../../entities/Permission.entity";
import { Payload } from "../../types/response";

export interface JsonWebTokenServiceInterface {
    generateToken(payload: object,expiresIn:string): string;
    check(jwt: string): boolean;
    decode(token:string):Promise<Payload | false>
}