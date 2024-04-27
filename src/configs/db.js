const { Sequelize } = require("sequelize");
const constants = require("./constants");

// const sequelize = new Sequelize("mydatabase", "user", "password", {
//   host: "localhost",
//   dialect: "postgres",
// });


const sequelize = new Sequelize(constants.POSTGRESQL_URI);

module.exports = sequelize;