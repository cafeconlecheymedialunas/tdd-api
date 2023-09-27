import { Sequelize } from 'sequelize';
import config from 'config';
import {Permission as PermissionModel} from './models/Permission';
import {Role as RoleModel} from './models/Role';
import {User, User as UserModel} from './models/User';

class ClientDatabase {

  private client!: Sequelize;

  constructor(){
    if (!this.client) {
        this.client = new Sequelize(config.DATABASE_NAME, config.DATABASE_USER, config.DATABASE_PASSWORD, {
          host: config.DATABASE_HOST,
          port: config.DATABASE_PORT,
          dialect: 'postgres',
        });;
      }

      this.init()
     
  }
  getClient(): Sequelize{
    return this.client;
  }





  async init() {
    try {
      

      await this.client.authenticate();

      await this.client.sync({ force: true });



      console.log('Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }
}

export default ClientDatabase;
