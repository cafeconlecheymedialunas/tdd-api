import { HttpCustomResponse } from "../../types/HttpCustomResponse";
export interface LoginUseCaseInterface {
    login(email: string, password: string): Promise<HttpCustomResponse>
}