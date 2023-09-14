export class PersonaOrigenTipo{
    private id;
    private descripcion;
  
    constructor(personaOrigenTipo: {
      id: number,
      descripcion: string,
    }) {
      this.id = personaOrigenTipo.id;
      this.descripcion = personaOrigenTipo.descripcion;
    }

    public getId(){
        return this.id;
    }

    public getDescription(){
        return this.descripcion;
    }

    public setId(id:number){
        this.id = id;
    }

    public setDescription(descripcion:string){
        this.descripcion = descripcion
    }
}