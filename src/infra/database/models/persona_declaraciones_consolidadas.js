const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_declaraciones_consolidadas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    apellido: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dni: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ultima_revision: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    },
    cod_identificador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    },
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    persona_renaper_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_renaper',
        key: 'id'
      },
      unique: "uk1"
    }
  }, {
    sequelize,
    tableName: 'persona_declaraciones_consolidadas',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_declaraciones_consolidadas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "uk1",
        unique: true,
        fields: [
          { name: "persona_renaper_id" },
        ]
      },
    ]
  });
};
