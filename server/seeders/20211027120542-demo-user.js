'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'test@test.com',
        nickname: 'test',
        img: '',
        password: '12341234',
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'test2@test.com',
        nickname: 'test2',
        img: '',
        password: '12341234',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
