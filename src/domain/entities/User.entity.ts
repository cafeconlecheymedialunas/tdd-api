import { Role, UserInterface} from "../types/user.types"

export class User {
    name: string
    email: string
    password: string
    id?: number
    roles?: Array<Role>

    constructor(name:string,email:string,password:string,id:number,roles?:Role[]) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id
        this.roles = roles ?? []
    }

}