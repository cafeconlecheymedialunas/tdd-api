const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_direccion', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cod_identificador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    },
    direccion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    }
  }, {
    sequelize,
    tableName: 'persona_direccion',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_direccion_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
