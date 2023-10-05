const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'persona_dato_declarado',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      atributo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      valor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cod_identificador: {
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
      tableName: 'persona_dato_declarado',
      schema: 'persona',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: 'persona_dato_declarado_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
