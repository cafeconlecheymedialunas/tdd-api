import { Permission } from "../../entities/Permission.entity";
import { Payload } from "../../types/response";

export interface JsonWebTokenServiceInterface {
    generate(payload: object,expiresIn:string): string;
    check(jwt: string): boolean;
    decode(token:string,permissions:Permission[]):Promise<Payload | false>
}