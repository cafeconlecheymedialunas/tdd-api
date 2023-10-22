import ClientException from './ClientException';

export default class NotFoundException extends ClientException {
  constructor(id: string | number, entity: string) {
    super(404, `${entity} with ${typeof id == 'number' ? 'id' : 'propertie'} ${id} not found`);
  }
}
