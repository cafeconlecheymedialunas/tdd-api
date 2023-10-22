export class PersonaDeclaracionesConsolidadas {
  private id: number;
  private nombre: string;
  private apellido: string;
  private dni: number;
  private telefono: string;
  private mail: string;
  private version_id: number;
  private genero: string;
  private persona_renaper_id: number;
  private cod_identificador: number;
  private ultima_revision: Date;

  constructor(personaDeclaracionesConsolidadas: {
    id: number;
    nombre: string;
    apellido: string;
    dni: number;
    telefono: string;
    mail: string;
    version_id: number;
    genero: string;
    persona_renaper_id: number;
    cod_identificador: number;
    ultima_revision: Date;
  }) {
    this.id = personaDeclaracionesConsolidadas.id;
    this.nombre = personaDeclaracionesConsolidadas.nombre;
    this.apellido = personaDeclaracionesConsolidadas.apellido;
    this.dni = personaDeclaracionesConsolidadas.dni;
    this.telefono = personaDeclaracionesConsolidadas.telefono;
    this.mail = personaDeclaracionesConsolidadas.mail;
    this.version_id = personaDeclaracionesConsolidadas.version_id;
    this.genero = personaDeclaracionesConsolidadas.genero;
    this.persona_renaper_id = personaDeclaracionesConsolidadas.persona_renaper_id;
    this.cod_identificador = personaDeclaracionesConsolidadas.cod_identificador;
    this.ultima_revision = personaDeclaracionesConsolidadas.ultima_revision;
  }

  // Getters
  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getApellido(): string {
    return this.apellido;
  }

  public getDni(): number {
    return this.dni;
  }

  public getTelefono(): string {
    return this.telefono;
  }

  public getMail(): string {
    return this.mail;
  }

  public getVersionId(): number {
    return this.version_id;
  }

  public getGenero(): string {
    return this.genero;
  }

  public getPersonaRenaperId(): number {
    return this.persona_renaper_id;
  }

  public getCodIdentificador(): number {
    return this.cod_identificador;
  }

  public getUltimaRevision(): Date {
    return this.ultima_revision;
  }

  // Setters
  public setId(id: number): void {
    this.id = id;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public setApellido(apellido: string): void {
    this.apellido = apellido;
  }

  public setDni(dni: number): void {
    this.dni = dni;
  }

  public setTelefono(telefono: string): void {
    this.telefono = telefono;
  }

  public setMail(mail: string): void {
    this.mail = mail;
  }

  public setVersionId(version_id: number): void {
    this.version_id = version_id;
  }

  public setGenero(genero: string): void {
    this.genero = genero;
  }

  public setPersonaRenaperId(persona_renaper_id: number): void {
    this.persona_renaper_id = persona_renaper_id;
  }

  public setCodIdentificador(cod_identificador: number): void {
    this.cod_identificador = cod_identificador;
  }

  public setUltimaRevision(ultima_revision: Date): void {
    this.ultima_revision = ultima_revision;
  }
}
