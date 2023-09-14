export class PersonaRenaper {
  private id;
  private fecha_nacimiento_renaper;
  private fecha_defuncion_renaper;
  private persona_documento_id;
  private lugar_nacimiento;
  private id_ciudadano;

  constructor(personaRenaper: {
    id: number;
    fecha_nacimiento_renaper: Date;
    fecha_defuncion_renaper: Date;
    persona_documento_id: number;
    lugar_nacimiento: string;
    id_ciudadano: string;
  }) {
    this.id = personaRenaper.id;
    this.fecha_nacimiento_renaper = personaRenaper.fecha_nacimiento_renaper;
    this.fecha_defuncion_renaper = personaRenaper.fecha_defuncion_renaper;
    this.persona_documento_id = personaRenaper.persona_documento_id;
    this.lugar_nacimiento = personaRenaper.lugar_nacimiento;
    this.id_ciudadano = personaRenaper.id_ciudadano;
  }

  public getId() {
    return this.id;
  }

  public getFechaNacimientoRenaper() {
    return this.fecha_nacimiento_renaper;
  }

  public getFechaDefuncionRenaper() {
    return this.fecha_defuncion_renaper;
  }

  public getPersonaDocumentoId() {
    return this.persona_documento_id;
  }

  public getLugarNacimiento() {
    return this.lugar_nacimiento;
  }

  public getIdCiudadano() {
    return this.id_ciudadano;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setFechaNacimientoRenaper(fecha_nacimiento_renaper: Date) {
    this.fecha_nacimiento_renaper = fecha_nacimiento_renaper;
  }

  public setFechaDefuncionRenaper(fecha_defuncion_renaper: Date) {
    this.fecha_defuncion_renaper = fecha_defuncion_renaper;
  }

  public setPersonaDocumentoId(persona_documento_id: number) {
    this.persona_documento_id = persona_documento_id;
  }

  public setLugarNacimiento(lugar_nacimiento: string) {
    this.lugar_nacimiento = lugar_nacimiento;
  }

  public setIdCiudadano(id_ciudadano: string) {
    this.id_ciudadano = id_ciudadano;
  }
}
