const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_renaper', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    lugar_nacimiento: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_ciudadano: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_defuncion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    persona_documento_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    }
  }, {
    sequelize,
    tableName: 'persona_renaper',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_renaper_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
