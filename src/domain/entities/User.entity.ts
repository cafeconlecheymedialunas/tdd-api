export class User {
    name: string
    email: string
    password: string
    id: number
    roles: number[]
    constructor(name: string, email: string, password: string, id: number, roles: number[] = []) {
        this.name = name
        this.email = email
        this.password = password
        this.id = id
        this.roles = roles
    }
}