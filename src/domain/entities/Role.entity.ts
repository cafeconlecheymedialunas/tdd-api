export class Role {
    name: string
    id: number
    permissions: number[];

    constructor(id: number, name: string, permissions: number[]) {
        this.name = name;
        this.id = id
        this.permissions = permissions
    }
}
