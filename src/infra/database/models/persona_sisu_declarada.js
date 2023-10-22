const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_sisu_declarada', {
    cod_identificador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    persona_renaper_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    },
    persona_origen_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    },
    fecha_importacion: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'persona_sisu_declarada',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_sisu_declarada_pkey",
        unique: true,
        fields: [
          { name: "cod_identificador" },
        ]
      },
    ]
  });
};
