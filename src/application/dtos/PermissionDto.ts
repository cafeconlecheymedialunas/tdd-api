import { PermissionDtoInterface } from "../../domain/interfaces/dtos/PermissionDtoInterface"

export class PermissionDto implements PermissionDtoInterface {
    id: number
    route: string
    method: string
    constructor(route: string, method: string, id: number) {
        this.route = route;
        this.id = id
        this.method = method
    }
}