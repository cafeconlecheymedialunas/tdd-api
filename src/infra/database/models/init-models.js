var DataTypes = require("sequelize").DataTypes;
var _Seeds = require("./Seeds");

function initModels(sequelize) {
  var Seeds = _Seeds(sequelize, DataTypes);


  return {
    Seeds,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
