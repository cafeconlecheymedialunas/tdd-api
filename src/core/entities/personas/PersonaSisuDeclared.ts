class PersonaSisuDeclared {
  private id;
  private cod_identificador;
  private persona_renaper_id;
  private persona_origen_id;
  private fecha_importacion;

  constructor(personaSisuDeclared: {
    id: number;
    cod_identificador: number;
    persona_renaper_id: number;
    persona_origen_id: number;
    fecha_importacion: Date;
  }) {
    this.id = personaSisuDeclared.id;
    this.cod_identificador = personaSisuDeclared.cod_identificador;
    this.persona_renaper_id = personaSisuDeclared.persona_renaper_id;
    this.persona_origen_id = personaSisuDeclared.persona_origen_id;
    this.fecha_importacion = personaSisuDeclared.fecha_importacion;
  }

  public getId() {
    return this.id;
  }

  public getCodIdentificador() {
    return this.cod_identificador;
  }

  public getPersonaRenaperId() {
    return this.persona_renaper_id;
  }

  public getPersonaOrigenId() {
    return this.persona_origen_id;
  }

  public getFechaImportacion() {
    return this.fecha_importacion;
  }

  public setCodIdentificador(cod_identificador: number) {
    this.cod_identificador = cod_identificador;
  }

  public setPersonaRenaperId(persona_renaper_id: number) {
    this.persona_renaper_id = persona_renaper_id;
  }

  public setPersonOrigenId(persona_persona_origen_id: number) {
    this.persona_origen_id = persona_persona_origen_id;
  }

  public setFechaImportacion(fecha_importacion: Date) {
    this.fecha_importacion = fecha_importacion;
  }
}
