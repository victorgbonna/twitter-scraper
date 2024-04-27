const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  twitter_tag: {
    type: DataTypes.STRING,
    allowNull: false
  },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
}, {
    timestamps: true
});

module.exports = User;
