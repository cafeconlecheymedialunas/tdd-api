import { hasCorrectMinLength, isNotEmpty } from "./validaciones";

/**
 * Represents a Role. The 'permissions' property should store an array of Permission IDs.
 */
export class Role {
  private id?: number;
  private name!: string;

  constructor(user:{id?: number, name: string}) {
    if(user.id){
      this.setId(user.id)
    }
    this.setName(user.name)
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    if(isNotEmpty(name)){

    }
    if( hasCorrectMinLength(name,1)){

    }
    this.name = name;
  }
}
