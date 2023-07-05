import { JsonWebTokenServiceInterface } from "../../domain/interfaces/services/JsonWebTokenServiceInterface";
import { Payload } from "../../domain/types/response";
import config from "../../config";
import { decode } from "jsonwebtoken";
import { Permission } from "../../domain/entities/Permission.entity";
export class JsonWebTokenService implements JsonWebTokenServiceInterface {
    private jwt
    constructor(jwt: any) {
        this.jwt = jwt;
        
    }

    generate(payload: Payload, expiresIn: string): string {
        const token = this.jwt.sign(payload, config.SECRET_KEY, { expiresIn });
        return token
    }

    check(jwt: string): boolean {
        const check = this.jwt.verify(jwt, config.SECRET_KEY)
        return check
    }

    async decode(token: string,routePermissions:Permission[]): Promise<Payload | false>{
        const tokenCleaned = token?.split(' ')[1];
        let $return:boolean | object = false;
        if (!tokenCleaned) {
            $return = false
        }
        this.jwt.verify(token, config.SECRET_KEY, function(err:Error, decoded:any) {
            if (err) {
                $return = false
            }
            console.log(decoded)
            $return = {
                id: decoded.id,
                permissions:decoded.permissions
            }
        }); 
        
        return $return
    }
}