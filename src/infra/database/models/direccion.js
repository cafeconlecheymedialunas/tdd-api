const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'direccion',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      calle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      altura: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      piso: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      depto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      manzana: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      torre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parcela: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lote: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entre_calle_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entre_calle_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      calle_esquina: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      casa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      terreno: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pasillo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pasaje: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referencia_auxiliar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tira: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      chacra: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      macizo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ruta: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      km: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'direccion',
      schema: 'persona',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: 'direccion_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
