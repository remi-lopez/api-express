module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    roles: {
      type: Sequelize.STRING,
      defaultValue: "USER"
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: true,
    },
  }, {
    tableName: 'user'
  });
  
  return User;
};