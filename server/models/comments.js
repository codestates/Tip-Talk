'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comments.belongsTo(models.user, { foreignKey: 'userId' });
      comments.belongsTo(models.post, { foreignKey: 'postId' });
    }
  }
  comments.init(
    {
      text: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'comments',
    },
  );
  return comments;
};
