export class PersonaOrigen{
    private id;
    private persona_atributo;
    private valor;
    private fecha_datos;
    private origen_id;
    private persona_sisu_id;
   
  
    constructor(personaOrigen: {
      id: number,
      persona_atributo: string,
      valor: string,
      fecha_datos: Date,
      origen_id: number,
      persona_sisu_id:number
    }) {
      this.id = personaOrigen.id;
      this.persona_atributo = personaOrigen.persona_atributo;
      this.valor = personaOrigen.valor;
      this.fecha_datos = personaOrigen.fecha_datos;
      this.origen_id = personaOrigen.origen_id;
      this.persona_sisu_id = personaOrigen.persona_sisu_id;
    }

    public getId() {
        return this.id;
    }

    public getPersonaAtributo() {
        return this.persona_atributo;
    }

    public getValor(){
        return this.valor;
    }

    public getFechaDatos() {
        return this.fecha_datos;
    }

    public getOrigenId(){
        return this.origen_id;
    }

    public getPersonaSisuId() {
        return this.persona_sisu_id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public setPersonaAtributo(personaAtributo: string): void {
        this.persona_atributo = personaAtributo;
    }

    public setValor(valor:string): void {
        this.valor = valor;
    }

    public setFechaDatos(fechaDatos: Date): void {
        this.fecha_datos = fechaDatos;
    }

    public setOrigenId(origenId: number): void {
        this.origen_id = origenId;
    }

    public setPersonaSisuId(personaSisuId: number): void {
        this.persona_sisu_id = personaSisuId;
    }
}