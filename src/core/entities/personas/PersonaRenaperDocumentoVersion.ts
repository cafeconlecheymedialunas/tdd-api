export class PersonaRenaperDocumentoVersion {
  private id;
  private persona_documento_id;
  private documento_tipo;
  private documento_numero;
  private ejemplar;
  private fecha_vencimiento;
  private fecha_emision;
  private apellido;
  private nombre;
  private cuil;
  private calle;
  private calle_nro;
  private piso;
  private departamento;
  private cpostal;
  private monoblock;
  private ciudad;
  private municipio;
  private provincia;
  private nacionalidad;
  private genero;
  private tramite_nro;

  constructor(personaRenaperDocumentoVersion: {
    id: number;
    persona_documento_id: number;
    documento_tipo: Date;
    documento_numero: Date;
    ejemplar: string;
    fecha_vencimiento: Date;
    fecha_emision: Date;
    apellido: string;
    nombre: string;
    cuil: number;
    calle: string;
    calle_nro: string;
    piso: string;
    departamento: string;
    cpostal: number;
    monoblock: string;
    ciudad: string;
    municipio: string;
    provincia: string;
    nacionalidad: string;
    genero: string;
    tramite_nro: number;
  }) {
    this.id = personaRenaperDocumentoVersion.id;
    this.persona_documento_id = personaRenaperDocumentoVersion.persona_documento_id;
    this.documento_tipo = personaRenaperDocumentoVersion.documento_tipo;
    this.documento_numero = personaRenaperDocumentoVersion.documento_numero;
    this.ejemplar = personaRenaperDocumentoVersion.ejemplar;
    this.fecha_vencimiento = personaRenaperDocumentoVersion.fecha_vencimiento;
    this.fecha_emision = personaRenaperDocumentoVersion.fecha_emision;
    this.apellido = personaRenaperDocumentoVersion.apellido;
    this.nombre = personaRenaperDocumentoVersion.nombre;
    this.cuil = personaRenaperDocumentoVersion.cuil;
    this.calle = personaRenaperDocumentoVersion.calle;
    this.calle_nro = personaRenaperDocumentoVersion.calle_nro;
    this.piso = personaRenaperDocumentoVersion.piso;
    this.departamento = personaRenaperDocumentoVersion.departamento;
    this.cpostal = personaRenaperDocumentoVersion.cpostal;
    this.monoblock = personaRenaperDocumentoVersion.monoblock;
    this.ciudad = personaRenaperDocumentoVersion.ciudad;
    this.municipio = personaRenaperDocumentoVersion.municipio;
    this.provincia = personaRenaperDocumentoVersion.provincia;
    this.nacionalidad = personaRenaperDocumentoVersion.nacionalidad;
    this.genero = personaRenaperDocumentoVersion.genero;
    this.tramite_nro = personaRenaperDocumentoVersion.tramite_nro;
  }

  public getId() {
    return this.id;
  }

  public getPersonaDocumentoId() {
    return this.persona_documento_id;
  }

  public getDocumentoTipo() {
    return this.documento_tipo;
  }

  public getDocumentoNumero() {
    return this.documento_numero;
  }

  public getEjemplar() {
    return this.ejemplar;
  }

  public getFechaVencimiento() {
    return this.fecha_vencimiento;
  }

  public getFechaEmision() {
    return this.fecha_emision;
  }

  public getApellido() {
    return this.apellido;
  }

  public getNombre() {
    return this.nombre;
  }

  public getCuil() {
    return this.cuil;
  }

  public getCalle() {
    return this.calle;
  }

  public getCalleNro() {
    return this.calle_nro;
  }

  public getPiso() {
    return this.piso;
  }

  public getDepartamento() {
    return this.departamento;
  }

  public getCpostal() {
    return this.cpostal;
  }

  public getMonoblock() {
    return this.monoblock;
  }

  public getCiudad() {
    return this.ciudad;
  }

  public getMunicipio() {
    return this.municipio;
  }

  public getProvincia() {
    return this.provincia;
  }

  public getNacionalidad() {
    return this.nacionalidad;
  }

  public getTramiteNro() {
    return this.tramite_nro;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setPersonaDocumentoId(persona_documento_id: number) {
    this.persona_documento_id = persona_documento_id;
  }

  public setDocumentoTipo(documento_tipo: Date) {
    this.documento_tipo = documento_tipo;
  }

  public setDocumentoNumero(documento_numero: Date) {
    this.documento_numero = documento_numero;
  }

  public setEjemplar(ejemplar: string) {
    this.ejemplar = ejemplar;
  }

  public setFechavencimiento(fecha_vencimiento: Date) {
    this.fecha_vencimiento = fecha_vencimiento;
  }

  public setFechaEmision(fecha_emision: Date) {
    this.fecha_emision = fecha_emision;
  }

  public setApellido(apellido: string) {
    this.apellido = apellido;
  }

  public setNombre(nombre: string) {
    this.nombre = nombre;
  }

  public setCuil(cuil: number): void {
    this.cuil = cuil;
  }

  public setCalle(calle: string): void {
    this.calle = calle;
  }

  public setCalleNro(calle_nro: string): void {
    this.calle_nro = calle_nro;
  }

  public setPiso(piso: string): void {
    this.piso = piso;
  }

  public setDepartamento(departamento: string): void {
    this.departamento = departamento;
  }

  public setCpostal(cpostal: number): void {
    this.cpostal = cpostal;
  }

  public setMonoblock(monoblock: string): void {
    this.monoblock = monoblock;
  }

  public setCiudad(ciudad: string): void {
    this.ciudad = ciudad;
  }

  public setMunicipio(municipio: string): void {
    this.municipio = municipio;
  }

  public setProvincia(provincia: string): void {
    this.provincia = provincia;
  }

  public setNacionalidad(nacionalidad: string): void {
    this.nacionalidad = nacionalidad;
  }

  public setGenero(genero: string): void {
    this.genero = genero;
  }

  public setTramiteNro(tramite_nro: number): void {
    this.tramite_nro = tramite_nro;
  }
}
