const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona_declaraciones_revisadas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    atributo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    valor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    persona_revision_declaraciones_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona_sisu_declarada',
        key: 'cod_identificador'
      }
    }
  }, {
    sequelize,
    tableName: 'persona_declaraciones_revisadas',
    schema: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "persona_declaraciones_revisadas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
