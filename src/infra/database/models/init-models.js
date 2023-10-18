var DataTypes = require("sequelize").DataTypes;
var _Seeds = require("./Seeds");
var _client_role = require("./client_role");
var _clients = require("./clients");
var _direccion = require("./direccion");
var _permissions = require("./permissions");
var _persona_anses = require("./persona_anses");
var _persona_dato_declarado = require("./persona_dato_declarado");
var _persona_declaraciones_consolidadas = require("./persona_declaraciones_consolidadas");
var _persona_declaraciones_revisadas = require("./persona_declaraciones_revisadas");
var _persona_direccion = require("./persona_direccion");
var _persona_origen = require("./persona_origen");
var _persona_origen_tipo = require("./persona_origen_tipo");
var _persona_renaper = require("./persona_renaper");
var _persona_renaper_documento = require("./persona_renaper_documento");
var _persona_renaper_documento_version = require("./persona_renaper_documento_version");
var _persona_revision_declaraciones = require("./persona_revision_declaraciones");
var _persona_sisu_declarada = require("./persona_sisu_declarada");
var _role_permission = require("./role_permission");
var _roles = require("./roles");
var _temporal_revision = require("./temporal_revision");
var _user_role = require("./user_role");
var _users = require("./users");

function initModels(sequelize) {
  var Seeds = _Seeds(sequelize, DataTypes);
  var client_role = _client_role(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var direccion = _direccion(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var persona_anses = _persona_anses(sequelize, DataTypes);
  var persona_dato_declarado = _persona_dato_declarado(sequelize, DataTypes);
  var persona_declaraciones_consolidadas = _persona_declaraciones_consolidadas(sequelize, DataTypes);
  var persona_declaraciones_revisadas = _persona_declaraciones_revisadas(sequelize, DataTypes);
  var persona_direccion = _persona_direccion(sequelize, DataTypes);
  var persona_origen = _persona_origen(sequelize, DataTypes);
  var persona_origen_tipo = _persona_origen_tipo(sequelize, DataTypes);
  var persona_renaper = _persona_renaper(sequelize, DataTypes);
  var persona_renaper_documento = _persona_renaper_documento(sequelize, DataTypes);
  var persona_renaper_documento_version = _persona_renaper_documento_version(sequelize, DataTypes);
  var persona_revision_declaraciones = _persona_revision_declaraciones(sequelize, DataTypes);
  var persona_sisu_declarada = _persona_sisu_declarada(sequelize, DataTypes);
  var role_permission = _role_permission(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var temporal_revision = _temporal_revision(sequelize, DataTypes);
  var user_role = _user_role(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  clients.belongsToMany(roles, { as: 'role_id_roles', through: client_role, foreignKey: "client_id", otherKey: "role_id" });
  permissions.belongsToMany(roles, { as: 'role_id_roles_role_permissions', through: role_permission, foreignKey: "permission_id", otherKey: "role_id" });
  roles.belongsToMany(clients, { as: 'client_id_clients', through: client_role, foreignKey: "role_id", otherKey: "client_id" });
  roles.belongsToMany(permissions, { as: 'permission_id_permissions', through: role_permission, foreignKey: "role_id", otherKey: "permission_id" });
  roles.belongsToMany(users, { as: 'user_id_users', through: user_role, foreignKey: "role_id", otherKey: "user_id" });
  users.belongsToMany(roles, { as: 'role_id_roles_user_roles', through: user_role, foreignKey: "user_id", otherKey: "role_id" });
  client_role.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(client_role, { as: "client_roles", foreignKey: "client_id"});
  role_permission.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
  permissions.hasMany(role_permission, { as: "role_permissions", foreignKey: "permission_id"});
  persona_origen.belongsTo(persona_origen_tipo, { as: "tipo_origen", foreignKey: "tipo_origen_id"});
  persona_origen_tipo.hasMany(persona_origen, { as: "persona_origens", foreignKey: "tipo_origen_id"});
  persona_declaraciones_consolidadas.belongsTo(persona_renaper, { as: "persona_renaper", foreignKey: "persona_renaper_id"});
  persona_renaper.hasOne(persona_declaraciones_consolidadas, { as: "persona_declaraciones_consolidada", foreignKey: "persona_renaper_id"});
  persona_anses.belongsTo(persona_sisu_declarada, { as: "persona_renaper", foreignKey: "persona_renaper_id"});
  persona_sisu_declarada.hasMany(persona_anses, { as: "persona_anses", foreignKey: "persona_renaper_id"});
  persona_dato_declarado.belongsTo(persona_sisu_declarada, { as: "cod_identificador_persona_sisu_declarada", foreignKey: "cod_identificador"});
  persona_sisu_declarada.hasMany(persona_dato_declarado, { as: "persona_dato_declarados", foreignKey: "cod_identificador"});
  persona_declaraciones_consolidadas.belongsTo(persona_sisu_declarada, { as: "cod_identificador_persona_sisu_declarada", foreignKey: "cod_identificador"});
  persona_sisu_declarada.hasMany(persona_declaraciones_consolidadas, { as: "persona_declaraciones_consolidadas", foreignKey: "cod_identificador"});
  persona_declaraciones_consolidadas.belongsTo(persona_sisu_declarada, { as: "ultima_revision_persona_sisu_declarada", foreignKey: "ultima_revision"});
  persona_sisu_declarada.hasMany(persona_declaraciones_consolidadas, { as: "ultima_revision_persona_declaraciones_consolidadas", foreignKey: "ultima_revision"});
  persona_declaraciones_revisadas.belongsTo(persona_sisu_declarada, { as: "persona_revision_declaracione", foreignKey: "persona_revision_declaraciones_id"});
  persona_sisu_declarada.hasMany(persona_declaraciones_revisadas, { as: "persona_declaraciones_revisadas", foreignKey: "persona_revision_declaraciones_id"});
  persona_direccion.belongsTo(persona_sisu_declarada, { as: "cod_identificador_persona_sisu_declarada", foreignKey: "cod_identificador"});
  persona_sisu_declarada.hasMany(persona_direccion, { as: "persona_direccions", foreignKey: "cod_identificador"});
  persona_direccion.belongsTo(persona_sisu_declarada, { as: "direccion", foreignKey: "direccion_id"});
  persona_sisu_declarada.hasMany(persona_direccion, { as: "direccion_persona_direccions", foreignKey: "direccion_id"});
  persona_renaper.belongsTo(persona_sisu_declarada, { as: "persona_documento", foreignKey: "persona_documento_id"});
  persona_sisu_declarada.hasMany(persona_renaper, { as: "persona_renapers", foreignKey: "persona_documento_id"});
  persona_renaper_documento.belongsTo(persona_sisu_declarada, { as: "persona_renaper", foreignKey: "persona_renaper_id"});
  persona_sisu_declarada.hasMany(persona_renaper_documento, { as: "persona_renaper_documentos", foreignKey: "persona_renaper_id"});
  persona_renaper_documento.belongsTo(persona_sisu_declarada, { as: "persona_documento_version_actual_persona_sisu_declarada", foreignKey: "persona_documento_version_actual"});
  persona_sisu_declarada.hasMany(persona_renaper_documento, { as: "persona_documento_version_actual_persona_renaper_documentos", foreignKey: "persona_documento_version_actual"});
  persona_renaper_documento_version.belongsTo(persona_sisu_declarada, { as: "persona_documento", foreignKey: "persona_documento_id"});
  persona_sisu_declarada.hasMany(persona_renaper_documento_version, { as: "persona_renaper_documento_versions", foreignKey: "persona_documento_id"});
  persona_revision_declaraciones.belongsTo(persona_sisu_declarada, { as: "cod_identificador_persona_sisu_declarada", foreignKey: "cod_identificador"});
  persona_sisu_declarada.hasMany(persona_revision_declaraciones, { as: "persona_revision_declaraciones", foreignKey: "cod_identificador"});
  persona_sisu_declarada.belongsTo(persona_sisu_declarada, { as: "persona_origen", foreignKey: "persona_origen_id"});
  persona_sisu_declarada.hasMany(persona_sisu_declarada, { as: "persona_sisu_declaradas", foreignKey: "persona_origen_id"});
  persona_sisu_declarada.belongsTo(persona_sisu_declarada, { as: "persona_renaper_persona_sisu_declarada", foreignKey: "persona_renaper_id"});
  persona_sisu_declarada.hasMany(persona_sisu_declarada, { as: "persona_renaper_persona_sisu_declaradas", foreignKey: "persona_renaper_id"});
  temporal_revision.belongsTo(persona_sisu_declarada, { as: "cod_identificador_persona_sisu_declarada", foreignKey: "cod_identificador"});
  persona_sisu_declarada.hasMany(temporal_revision, { as: "temporal_revisions", foreignKey: "cod_identificador"});
  client_role.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(client_role, { as: "client_roles", foreignKey: "role_id"});
  role_permission.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(role_permission, { as: "role_permissions", foreignKey: "role_id"});
  user_role.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(user_role, { as: "user_roles", foreignKey: "role_id"});
  user_role.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_role, { as: "user_roles", foreignKey: "user_id"});

  return {
    Seeds,
    client_role,
    clients,
    direccion,
    permissions,
    persona_anses,
    persona_dato_declarado,
    persona_declaraciones_consolidadas,
    persona_declaraciones_revisadas,
    persona_direccion,
    persona_origen,
    persona_origen_tipo,
    persona_renaper,
    persona_renaper_documento,
    persona_renaper_documento_version,
    persona_revision_declaraciones,
    persona_sisu_declarada,
    role_permission,
    roles,
    temporal_revision,
    user_role,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
