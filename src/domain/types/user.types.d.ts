export interface UserInterface {
    name: string
    email: string
    password: string
    id?: number
    roles?: Role[]
}

export interface Role {
    id: number,
    name: string,
    permissions: Permission[]
}

export interface Permission {
    id: string
    name: Array<'create_user' | 'delete_user', 'login', ''>
}

export type UserRequired = Pick<User, "name" | "password" | "email">;