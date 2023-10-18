const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('temporal_revision', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    apellodo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    documento_tipo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    documento_nro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fallecimiento: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tipo_revision: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    impacto: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'temporal_revision',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "temporal_revision_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
