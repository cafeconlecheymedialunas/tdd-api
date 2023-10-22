export class PersonaRevisionDeclaraciones {
  private id;
  private fecha_revision;
  private usuario;
  private observaciones;
  private cod_identificador;

  constructor(personaOrigen: {
    id: number;
    fecha_revision: string;
    usuario: string;
    cod_identificador: number;
    observaciones: string;
  }) {
    this.id = personaOrigen.id;
    this.fecha_revision = personaOrigen.fecha_revision;
    this.usuario = personaOrigen.usuario;
    this.cod_identificador = personaOrigen.cod_identificador;
    this.observaciones = personaOrigen.observaciones;
  }

  public getId() {
    return this.id;
  }

  public getAtributo() {
    return this.fecha_revision;
  }

  public getValor() {
    return this.usuario;
  }

  public getCodIdentificador() {
    return this.cod_identificador;
  }

  public getObservaciones() {
    return this.observaciones;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setAtributo(fecha_revision: string): void {
    this.fecha_revision = fecha_revision;
  }

  public setValor(usuario: string): void {
    this.usuario = usuario;
  }

  public setCodIdentificador(cod_identificador: number): void {
    this.cod_identificador = cod_identificador;
  }

  public setObservaciones(cobservaciones: string): void {
    this.observaciones = cobservaciones;
  }
}
