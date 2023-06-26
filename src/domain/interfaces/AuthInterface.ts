import { UserInterface } from "../types/user.types"
import { HttpResponse } from "../types/httresponse"

export interface AuthInterface{
    users: Array<UserInterface>
    register(user:UserInterface): HttpResponse
    auth(email:string,password:string): HttpResponse
    findAndDelete(id:number):HttpResponse
}