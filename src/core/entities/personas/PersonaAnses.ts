export class PersonaAnses {
  private id;
  private persona_renaper_id;
  private cuil;
  private fecha_actualizacion;
  private archivo_origen;
  private id_ciudadano;

  constructor(personaRenaperDocumento: {
    id: number;
    persona_renaper_id: number;
    cuil: number;
    fecha_actualizacion: number;
    archivo_origen: string;
    id_ciudadano: string;
  }) {
    this.id = personaRenaperDocumento.id;
    this.persona_renaper_id = personaRenaperDocumento.persona_renaper_id;
    this.cuil = personaRenaperDocumento.cuil;
    this.fecha_actualizacion = personaRenaperDocumento.fecha_actualizacion;
    this.archivo_origen = personaRenaperDocumento.archivo_origen;
    this.id_ciudadano = personaRenaperDocumento.id_ciudadano;
  }

  public getId() {
    return this.id;
  }

  public getPersonaRenaperId() {
    return this.persona_renaper_id;
  }

  public getCuil() {
    return this.cuil;
  }

  public getFechaActualizacion() {
    return this.fecha_actualizacion;
  }

  public getArchivoOrigen() {
    return this.archivo_origen;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setPersonaRenaperId(persona_renaper_id: number) {
    this.persona_renaper_id = persona_renaper_id;
  }

  public setCuil(cuil: number) {
    this.cuil = cuil;
  }

  public setFechaActualizacion(fecha_actualizacion: number) {
    this.fecha_actualizacion = fecha_actualizacion;
  }

  public setArchivoOrigen(archivo_origen: string) {
    this.archivo_origen = archivo_origen;
  }
}
