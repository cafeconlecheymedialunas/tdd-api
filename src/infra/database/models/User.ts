import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  // Si es necesario, define relaciones aquí

  public static initialize(connectionDatabase: Sequelize) {
    const sequelize: Sequelize = connectionDatabase;
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User', // Nombre del modelo en la base de datos
        tableName: 'users', // Nombre de la tabla en la base de datos
      },
    );
  }

  public static associate(models: any) {
    this.belongsToMany(models.Role, {
      through: 'user_role', // Nombre de la tabla intermedia
      foreignKey: 'role_id', // Clave foránea en la tabla intermedia que apunta a Role
      otherKey: 'user_id', // Clave foránea en la tabla intermedia que apunta a Permission
    });
  }
}
