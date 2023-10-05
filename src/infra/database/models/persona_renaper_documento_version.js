const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'persona_renaper_documento_version',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      documento_tipo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      documento_numero: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ejemplar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fecha_vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      fecha_emision: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cuil: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      calle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      calle_nro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      piso: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      departamento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cpostal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      barrio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monoblock: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      municipio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provincia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pais: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nacionalidad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tramite_nro: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      persona_documento_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'persona_sisu_declarada',
          key: 'cod_identificador',
        },
      },
    },
    {
      sequelize,
      tableName: 'persona_renaper_documento_version',
      schema: 'persona',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: 'persona_renaper_documento_version_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
