import { Model, DataTypes, Sequelize } from 'sequelize';

export class Role extends Model {
  public id!: number;
  public name!: string;

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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Role', // Nombre del modelo en la base de datos
        tableName: 'roles', // Nombre de la tabla en la base de datos
      },
    );
  }

  public static associate(models: any) {
    // Define la relación muchos a muchos con Permission
    this.belongsToMany(models.Permission, {
      through: 'role_permission', // Nombre de la tabla intermedia
      foreignKey: 'role_id', // Clave foránea en la tabla intermedia que apunta a Role
      otherKey: 'permission_id', // Clave foránea en la tabla intermedia que apunta a Permission
    });

    this.belongsToMany(models.User, {
      through: 'user_role', // Nombre de la tabla intermedia
      foreignKey: 'user_id', // Clave foránea en la tabla intermedia que apunta a Role
      otherKey: 'role_id', // Clave foránea en la tabla intermedia que apunta a Permission
    });
  }
}
