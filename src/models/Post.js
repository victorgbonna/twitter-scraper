const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    // allowNull: false,
    // unique: true,
  },
  photo_collections: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue:[]
  },
  video_collections: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue:[]
  },
  contentPostedAt:{
    type: DataTypes.DATE
  },
  type:{
    type: DataTypes.STRING
  },
  tweet_id: {
    type: DataTypes.STRING
  },
}, {
    timestamps: true
});

module.exports = Post;
