const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_anses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cuil: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_defuncion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    persona_renaper_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    },
    fecha_actualizacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    archivo_origen: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'persona_anses',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_anses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
