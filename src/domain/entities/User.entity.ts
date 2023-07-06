
import { UserInterface } from "../types/user.types"
import { Role } from "./Role.entity"

export class User implements UserInterface {
    name: string
    email: string
    password: string
    id?: number
 

    constructor(name: string, email: string, password: string, id: number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id
    }

}