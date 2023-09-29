import { Sequelize } from 'sequelize';
import config from '../../config';

class ClientDatabase {
  private client!: Sequelize;

  constructor() {
    if (!this.client) {
      this.client = new Sequelize(config.DATABASE_NAME, config.DATABASE_USER, config.DATABASE_PASSWORD, {
        host: config.DATABASE_HOST,
        port: config.DATABASE_PORT,
        dialect: 'postgres',
        logging: false,
      });
    }

    this.init();
  }
  getClient(): Sequelize {
    return this.client;
  }

  async init() {
    try {
      await this.client.authenticate();

      await this.client.sync({ alter: true });

      console.log('Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }
}

export default ClientDatabase;
