const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize();

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roles: {
    type: DataTypes.JSON,
    defaultValue: "ROLE_USER"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  groupes_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATETIME,
    defaultValue: Date.now()
  },
  created_at: {
    type: DataTypes.DATETIME,
    allowNull: true
  },
}, {});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true