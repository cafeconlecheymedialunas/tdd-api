const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_revision_declaraciones', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_revision: {
      type: DataTypes.DATE,
      allowNull: true
    },
    usuario: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cod_identificador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    }
  }, {
    sequelize,
    tableName: 'persona_revision_declaraciones',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_revision_declaraciones_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
