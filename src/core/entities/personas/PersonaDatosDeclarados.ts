export class PersonaDatosDeclarados {
  private id;
  private atributo;
  private valor;
  private cod_identificador;

  constructor(personaOrigen: { id: number; atributo: string; valor: string; cod_identificador: number }) {
    this.id = personaOrigen.id;
    this.atributo = personaOrigen.atributo;
    this.valor = personaOrigen.valor;
    this.cod_identificador = personaOrigen.cod_identificador;
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

  public getCodIdentificador() {
    return this.cod_identificador;
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

  public setCodIdentificador(cod_identificador: number): void {
    this.cod_identificador = cod_identificador;
  }
}
