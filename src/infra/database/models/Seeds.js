const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Seeds', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Seeds',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Seeds_pkey",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
