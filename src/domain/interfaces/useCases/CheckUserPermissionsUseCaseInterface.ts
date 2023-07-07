import { HttpCustomResponse } from "../../types/HttpCustomResponse";

export interface CheckUserPermissionsUseCaseInterface {
    check(route:string,method:string,token:string): Promise<boolean>
}