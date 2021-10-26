let posts = [
  {
    post: {
      id: 1,
      title: '현대백화점 신촌점',
      content: 'txt',
      images: '사진첨부',
      views: 200,
      likes: 78,
      categoryId: 2,
      lat: 37.457761295660084,
      lng: 126.76017260475932,
      region: '인천',
      updatedAt: Date.now(),
      createdAt: Date.now(),
    },
  },
  {
    post: {
      id: 2,
      title: '더현대 여의도점',
      content: 'txt',
      images: '사진첨부',
      views: 140,
      likes: 32,
      lat: 37.4462920026041,
      lng: 126.372737043106,
      region: '인천',
      categoryId: 1,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    },
  },
];

//getPosts ??

module.exports = {
  getPost: (req, res) => {
    const { id } = req.params;
    const post = posts.filter((post) => post.post.id === +id);

    if (!post) {
      return res
        .status(404)
        .json({ status: false, message: '존재하지 않는 게시글입니다.' });
    }
    res.status(200).json({ status: true, data: post });
  },
  //lat, lng, region
  uploadPost: (req, res) => {
    const { categoryid } = req.params;
    const { title, content, images, categoryId } = req.body;
    //여행category-> 숙박, 맛집, 여행지, 카페, 유흥등등

    if (!title || !content || !images || !categoryId) {
      res
        .status(400)
        .json({ status: false, message: '모든 항목을 입력해야 합니다.' });
    }

    const created = {
      id: +Date.now(), //Date.now -> 시간을 엄청 쪼개서 고유값으로 만드는거 (+는 num으로)
      title,
      content,
      images,
      views,
      likes,
      lat,
      lng,
      region,
      categoryid: +categoryid,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };

    posts.push(created);

    res.status(201).json({ status: true, data: created });
  },
  editPost: (req, res) => {
    const { id } = req.params;
    const post = posts.filter((post) => post.id === +id);
    const { title, content, images, categoryId } = req.body;

    if (!post) {
      res
        .status(404)
        .json({ status: false, message: '존재하지 않는 게시글입니다.' });
    }

    if (!title || !content || !images || !categoryId) {
      res
        .status(400)
        .json({ status: false, message: '모든 항목을 입력해야 합니다.' });
    } else {
      res.status(200).json({ status: true, message: 'Ok' });
    }
  },
  deletePost: (req, res) => {
    const { id } = req.params;
    posts = posts.filter((post) => post.id !== +id);
    // res.status(204).json({ status: true, message: 'Ok' });
    res.sendStatus(204);
  },
};

//미들웨어 추가 !!
