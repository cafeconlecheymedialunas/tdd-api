const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_origen', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    datos: {
      type: DataTypes.JSON,
      allowNull: true
    },
    codigo_visita: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_importacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tipo_origen_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_origen_tipo',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'persona_origen',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_origen_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
