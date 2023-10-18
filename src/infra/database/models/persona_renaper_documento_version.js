const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_renaper_documento_version', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    documento_tipo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    documento_numero: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ejemplar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_vencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_emision: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cuil: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    calle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    calle_nro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    piso: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    departamento: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cpostal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    barrio: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    monoblock: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ciudad: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    municipio: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    provincia: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pais: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nacionalidad: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tramite_nro: {
      type: DataTypes.INTEGER,
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
    tableName: 'persona_renaper_documento_version',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_renaper_documento_version_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
