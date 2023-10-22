const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role_permission', {
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'permissions',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'role_permission',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "role_permission_pkey",
        unique: true,
        fields: [
          { name: "permission_id" },
          { name: "role_id" },
        ]
      },
    ]
  });
};
