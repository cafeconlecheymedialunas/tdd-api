const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      schema: 'persona',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: 'users_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
