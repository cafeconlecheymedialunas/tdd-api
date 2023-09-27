import { isNotEmpty } from "./validaciones";

export class UserRole {
  private userId!: number;
  private roleId!: number;
  private id?:number;

  constructor(userRole:{id?:number,userId: number, roleId: number}) {

    if(userRole.id){
        this.setId(userRole.id)
    }
    this.setUserId(userRole.userId)
    this.setRoleId(userRole.roleId)
  }

  public getId(){
    return this.id;
  }

  public getUserId() {
    return this.userId;
  }

  public getRoleId() {
    return this.roleId;
  }

  public setId(id:number){
    this.id = id;
  }

  public setRoleId(roleId: number) {

    if(!isNotEmpty(roleId)){

    }
    this.roleId = roleId;
  }

  public setUserId(userId: number) {

    if(!isNotEmpty(userId)){
    
    }
    this.userId = userId;
  }
}
