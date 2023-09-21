export class TemporalRevision {
  private id;
  private nombre;
  private apellido;
  private tipo_documento;
  private nro_documento;
  private genero;
  private fecha_nacimiento;
  private edad;
  private cod_identificador;
  private fallecimiento;
  private telefono;
  private tipo_revision;
  private impacto;

  constructor(temporalRevision: {
    id: number;
    nombre: string;
    apellido: string;
    tipo_documento: string;
    nro_documento: number;
    genero: string;
    fecha_nacimiento: Date;
    edad: number;
    cod_identificador: number;
    fallecimiento: boolean;
    telefono: number;
    tipo_revision: string;
    impacto: boolean;
  }) {
    this.id = temporalRevision.id;
    this.nombre = temporalRevision.nombre;
    this.apellido = temporalRevision.apellido;
    this.tipo_documento = temporalRevision.tipo_documento;
    this.nro_documento = temporalRevision.nro_documento;
    this.genero = temporalRevision.genero;
    this.fecha_nacimiento = temporalRevision.fecha_nacimiento;
    this.edad = temporalRevision.edad;
    this.cod_identificador = temporalRevision.cod_identificador;
    this.fallecimiento = temporalRevision.fallecimiento;
    this.telefono = temporalRevision.telefono;
    this.tipo_revision = temporalRevision.tipo_revision;
    this.impacto = temporalRevision.impacto;
  }

  public getId() {
    return this.id;
  }

  public getNombre() {
    return this.nombre;
  }

  public getApellido() {
    return this.apellido;
  }

  public getTipoDocumento() {
    return this.tipo_documento;
  }

  public getNroDocumento() {
    return this.nro_documento;
  }

  public getGenero() {
    return this.genero;
  }

  public getFechaNacimiento() {
    return this.fecha_nacimiento;
  }

  public getEdad() {
    return this.edad;
  }

  public getCodIdentificador() {
    return this.cod_identificador;
  }

  public getFallecimiento() {
    return this.fallecimiento;
  }

  public getTelefono() {
    return this.telefono;
  }

  public getTipoRevision() {
    return this.tipo_revision;
  }

  public getImpacto() {
    return this.impacto;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setNombre(nombre: string) {
    this.nombre = nombre;
  }

  public setApellido(apellido: string) {
    this.apellido = apellido;
  }

  public setTipoDocumento(tipo_documento: string): void {
    this.tipo_documento = tipo_documento;
  }

  public setNroDocumento(nro_documento: number): void {
    this.nro_documento = nro_documento;
  }

  public setGenero(genero: string): void {
    this.genero = genero;
  }

  public setFechaNacimiento(fecha_nacimiento: Date): void {
    this.fecha_nacimiento = fecha_nacimiento;
  }

  public setEdad(edad: number): void {
    this.edad = edad;
  }

  public setCodIdentificador(cod_identificador: number): void {
    this.cod_identificador = cod_identificador;
  }

  public setFallecimiento(fallecimiento: boolean): void {
    this.fallecimiento = fallecimiento;
  }

  public setTelefono(telefono: number): void {
    this.telefono = telefono;
  }

  public setTipoRevision(tipo_revision: string): void {
    this.tipo_revision = tipo_revision;
  }

  public setImpacto(impacto: boolean): void {
    this.impacto = impacto;
  }
}
