import { HttpCustomResponse } from "../../types/http-response";

export interface AuthUseCaseInterface {
    login(email: string, password: string): Promise<HttpCustomResponse>
}