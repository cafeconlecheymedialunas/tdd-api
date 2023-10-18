const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direccion', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    calle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    altura: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    piso: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    depto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    manzana: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sector: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    torre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    parcela: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lote: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    entre_calle_1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    entre_calle_2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    calle_esquina: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    casa: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    terreno: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pasillo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pasaje: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    referencia_auxiliar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tira: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    chacra: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    macizo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    seccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ruta: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    km: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'direccion',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "direccion_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
