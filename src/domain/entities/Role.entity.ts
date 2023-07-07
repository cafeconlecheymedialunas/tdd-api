
import { RoleInterface } from "../interfaces/entities/RoleInterface";
import { Permission } from "./Permission.entity";


export class Role implements RoleInterface{
    name: string
    id: number
   
    constructor(name: string, id: number) {
        this.name = name;
        this.id = id
       
    }

}



