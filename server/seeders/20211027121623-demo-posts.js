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
      {
        title: '낙랑파라',
        content: '아기자기한 소품들과 조용한 카페분위기에요~',
        images: [
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/93905c6d-1be3-4550-bbaa-c619c7014968/%E1%84%82%E1%85%A1%E1%86%A8%E1%84%85%E1%85%A1%E1%86%BC%E1%84%91%E1%85%A1%E1%84%85%E1%85%A1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211028%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211028T024112Z&X-Amz-Expires=86400&X-Amz-Signature=33630af89410f2e9c4d77949b26989988b8de335de64ee7ca3a4fef35dcf7cea&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2582%25E1%2585%25A1%25E1%2586%25A8%25E1%2584%2585%25E1%2585%25A1%25E1%2586%25BC%25E1%2584%2591%25E1%2585%25A1%25E1%2584%2585%25E1%2585%25A1.jpeg%22',
        ],
        views: 24,
        lat: 37.55957245461398,
        lng: 126.95690573733543,
        region: '서울특별시 서대문구 북아현동',
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '뜨랑블랑',
        content: '카페 외관이 너무 이쁘고 내부도 디자인이 너무 이뻐요',
        images: [
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/054d2ab1-7d78-4943-a0a4-1f3b13aca972/%E1%84%84%E1%85%B3%E1%84%85%E1%85%A1%E1%86%BC%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%86%BC.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211028%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211028T024729Z&X-Amz-Expires=86400&X-Amz-Signature=56c9990c3faa43cdc63e7ded4ff53c9e56741c6e53277744e1ad890505ae5430&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2584%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25A1%25E1%2586%25BC%25E1%2584%2587%25E1%2585%25B3%25E1%2586%25AF%25E1%2584%2585%25E1%2585%25A1%25E1%2586%25BC.jpeg%22',
        ],
        views: 32,
        lat: 37.537114070206634,
        lng: 126.94382545190385,
        region: '서울특별시 마포구 마포동',
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '비파티세리&쿠도스',
        content: '가게에서 파는 빵이 너무 맛있고 공부하기도 좋아요',
        images: [
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/69f04d32-9f63-4ef1-aec8-8380099fa0ce/%E1%84%87%E1%85%B5%E1%84%91%E1%85%A1%E1%84%90%E1%85%B5%E1%84%89%E1%85%A6%E1%84%85%E1%85%B5.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211028%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211028T025224Z&X-Amz-Expires=86400&X-Amz-Signature=573ce6718560e002561e5aa315e1442a3d5ce7629e163f2f04964bde94805df7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2587%25E1%2585%25B5%25E1%2584%2591%25E1%2585%25A1%25E1%2584%2590%25E1%2585%25B5%25E1%2584%2589%25E1%2585%25A6%25E1%2584%2585%25E1%2585%25B5.jpeg%22',
        ],
        views: 12,
        lat: 37.55017434738842,
        lng: 126.96003451324378,
        region: '서울특별시 마포구 공덕동',
        categoryId: 4,
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
