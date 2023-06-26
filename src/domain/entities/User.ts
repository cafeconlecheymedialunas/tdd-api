import { Role, UserInterface} from "../types/user.types"
export class User {

    #name: string
    #roles?: Array<Role>
    #email: string
    #password: string
    #id?: number
    constructor(name:string,email:string,password:string,roles?:Role[],id?:number) {
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#roles = roles || []
        this.#id = id || 2
    }

    getName() {
        return this.#name
    }
    getEmail() {
        return this.#email
    }
    getPassword() {
        return this.#password
    }
    getRoles() {
        return this.#roles
    }
   
    generateId() {
        const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
        return uint32;
    }
}