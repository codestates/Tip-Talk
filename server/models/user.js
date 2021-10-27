'use strict';
const { Model } = require('sequelize');
const user_place_likes = require('./user_place_likes');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(comments, { foreignKey: 'userId' });
      user.hasOne(post, { foreignKey: 'userId' });
      user.hasOne(user_place_likes, { foreignKey: 'userId' });
    }
  }
  user.init(
    {
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return user;
};
