const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_role', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clients',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'client_role',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "client_role_pkey",
        unique: true,
        fields: [
          { name: "role_id" },
          { name: "client_id" },
        ]
      },
    ]
  });
};
