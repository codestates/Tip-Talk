'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('posts', [
      {
        title: '낙산해수욕장',
        content: '낙산해수욕장에 놀러오세요!',
        images: [
          'https://ldb-phinf.pstatic.net/20200113_123/15789107953888MCKO_JPEG/R5ZoCH1mHYNR-ZvbW5vgBjFp.jpg',
        ],
        views: 52,
        lat: 38.10246879692998,
        lng: 128.63822492864597,
        region: '강원도 양양군 양양읍 조산리',
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '낙산횟집',
        content: '갓잡은 싱싱한 회 잔뜩 있습니다.',
        images: [
          'http://blogfiles.naver.net/MjAyMTA4MjdfMTEx/MDAxNjMwMDY4NjQ0MTgw.CKHRqWRASJ48m1VffQra8OnYjLk2iWMl4bGxz2D-U_sg.to779jA-d9N2USrx-vcui5MIbxUqn7DPAj_6tSjtwvwg.JPEG.prisun/15.jpg',
        ],
        views: 127,
        lat: 38.10246879692998,
        lng: 128.63822492864597,
        region: '강원도 양양군 양양읍 조산리',
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
