export class PersonaDeclaracionesRevisadas {
  private id;
  private atributo;
  private valor;
  private revision_id;

  constructor(personaOrigen: { id: number; atributo: string; valor: string; revision_id: number }) {
    this.id = personaOrigen.id;
    this.atributo = personaOrigen.atributo;
    this.valor = personaOrigen.valor;
    this.revision_id = personaOrigen.revision_id;
  }

  public getId() {
    return this.id;
  }

  public getAtributo() {
    return this.atributo;
  }

  public getValor() {
    return this.valor;
  }

  public getRevisionId() {
    return this.revision_id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setAtributo(atributo: string): void {
    this.atributo = atributo;
  }

  public setValor(valor: string): void {
    this.valor = valor;
  }

  public setRevisionId(revision_id: number): void {
    this.revision_id = revision_id;
  }
}
