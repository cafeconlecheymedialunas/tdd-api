import { JsonWebTokenServiceInterface } from "../../domain/interfaces/services/JsonWebTokenServiceInterface";
import { HttpStatuses, Payload } from "../../domain/types/response";
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
    async check(token: string): Promise<boolean> {

        try {
            const decoded = this.jwt.verify(token, config.SECRET_KEY);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < currentTime) {
                throw new ClientError('Token has expired.', HttpStatuses.FORBIDDEN)
            }
            return (decoded.id) ? true : false
        } catch (e) {
            throw new ClientError('The request could not be made, try again later.', HttpStatuses.FORBIDDEN)
        }

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