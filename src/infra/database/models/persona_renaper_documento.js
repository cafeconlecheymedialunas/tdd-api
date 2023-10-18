const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_renaper_documento', {
    id: {
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
    persona_documento_version_actual: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    }
  }, {
    sequelize,
    tableName: 'persona_renaper_documento',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_renaper_documento_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
