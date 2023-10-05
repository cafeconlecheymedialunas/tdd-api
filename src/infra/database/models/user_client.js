const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user_client',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'clients',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'user_client',
      schema: 'persona',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: 'user_client_pkey',
          unique: true,
          fields: [{ name: 'user_id' }, { name: 'client_id' }],
        },
      ],
    },
  );
};
