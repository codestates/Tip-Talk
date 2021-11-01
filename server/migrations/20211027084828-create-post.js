'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      images: {
        type: Sequelize.TEXT,
      },
      views: {
        type: Sequelize.INTEGER,
      },
      categoryId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      lat: {
        type: Sequelize.FLOAT(20, 17),
      },
      lng: {
        type: Sequelize.FLOAT(20, 17),
      },
      region: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  },
};
