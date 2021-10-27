'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(user, { foreignKey: 'userId' });
      post.hasMany(categories, { foreignKey: 'categoryId' });
      post.hasOne(comments, { foreignKey: 'postId' });
      post.hasOne(user_place_likes, { foreignKey: 'postId' });
    }
  }
  post.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      imges: DataTypes.STRING,
      views: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      region: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'post',
    },
  );
  return post;
};
