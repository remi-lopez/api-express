const dbConfig = require("../config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: 8889,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.group = require("./group.model.js")(sequelize, Sequelize);

db.user.belongsTo(db.group, {
  foreignKey: 'groupe_id', 
  as: 'Group'
});
db.group.hasMany(db.user, {
  foreignKey: 'groupe_id'
});

module.exports = db;