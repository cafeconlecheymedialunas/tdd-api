import { Model, DataTypes, Sequelize } from 'sequelize';


export class Permission extends Model {
  public id!: number;
  public route!: string;
  public method!: string;
  // Si es necesario, define relaciones aquí

  public static initialize(connectionDatabase:Sequelize) {
    const sequelize: Sequelize = connectionDatabase;
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        route: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        method: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Permission', // Nombre del modelo en la base de datos
        tableName: 'permissions', // Nombre de la tabla en la base de datos
      }
    );
  }

  public static associate(models: any) {
    // Define la relación muchos a muchos con Role
    this.belongsToMany(models.Role, {
      through: 'role_permission', // Nombre de la tabla intermedia (debe coincidir con el nombre en Role.ts)
      foreignKey: 'permission_id', // Clave foránea en la tabla intermedia que apunta a Permission
      otherKey: 'role_id', // Clave foránea en la tabla intermedia que apunta a Role
    });
  }

}


