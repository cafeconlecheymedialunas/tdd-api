import { JsonWebTokenServiceInterface } from "../../domain/interfaces/services/JsonWebTokenServiceInterface";
import { Payload } from "../../domain/types/response";
import config from "../../config";
import { ClientError } from "../../infraestructure/utils";
export class JsonWebTokenService implements JsonWebTokenServiceInterface {
    private jwt
    constructor(jwt: any) {
        this.jwt = jwt;
    }
    async generateToken(payload: Payload, expiresIn: string): Promise<string> {
        const token = await this.jwt.sign(payload, config.SECRET_KEY, { expiresIn });
        return token
    }
    async check(jwt: string): Promise<boolean> {
        const check = await this.jwt.verify(jwt, config.SECRET_KEY)
        return check
    }
    async decode(token: string): Promise<Payload | void> {
        const tokenCleaned = token?.split(' ')[1];

        if (!tokenCleaned) {
            throw new ClientError('No se encontro', 400)
        }
        this.jwt.verify(token, config.SECRET_KEY, function (err: Error, decoded: any) {
            if (err) {
                throw new ClientError('No se encontro', 400)
            }

            return {
                id: decoded.id,
                permissions: decoded.permissions
            }
        });

    }
}