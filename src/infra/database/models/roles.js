const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'roles',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'roles',
      schema: 'persona',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: 'roles_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
