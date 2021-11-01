const { post, user, categories } = require('../models');
//id title content imagese views likes lat lng region
//getPosts ??

module.exports = {
  getPost: async (req, res) => {
    const { id } = req.params;
    try {
      const posts = await post.findOne({
        where: { id },
        include: [
          { model: user, attributes: ['nickname', 'email', 'img'] },
          { model: categories, attributes: ['value'] },
        ],
      });
      if (!posts) {
        return res
          .status(404)
          .json({ status: false, message: '존재하지 않는 게시글입니다.' });
      }
      //post는 다 가져와야하는듯
      res.status(200).json({ status: true, posts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: 'server error' });
    }
  },
  //userinfo 가져오기
  //lat, lng, region
  uploadPost: async (req, res) => {
    const { categoryid } = req.params;
    const { title, content, images, categoryId, lat, lng, region } = req.body;
    //여행category-> 숙박, 맛집, 여행지, 카페
    if (!title || !content || !images || !categoryId) {
      return res
        .status(400)
        .json({ status: false, message: '모든 항목을 입력해야 합니다.' });
    }
    try {
      const data = {
        userId: 1,
        title,
        content,
        images,
        views: 0,
        categoryid: +categoryid,
        lat,
        lng,
        region,
      };
      const create = await post.create({ ...data });
      res.status(201).json({ status: true, data: create });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: 'server error' });
    }
  },
  editPost: async (req, res) => {
    const { title, content, images, categoryId } = req.body;
    const { id } = req.params;
    if (!title || !content || !images || !categoryId) {
      return res
        .status(400)
        .json({ status: false, message: '모든 항목을 입력해야 합니다.' });
    }
    try {
      const posts = await post.findOne({
        where: { id },
      });

      if (!posts) {
        return res
          .status(404)
          .json({ status: false, message: '존재하지 않는 게시글입니다.' });
      }
      await post.update(
        { title, content, images, categoryId },
        { where: { id: id } },
      );
      const updated = await post.findOne({
        where: { id },
      });
      res.status(200).json({ status: true, data: updated });
    } catch (error) {
      res.status(500).json({ status: false, message: 'server error' });
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const posts = await post.findOne({ where: { id: id } });
      await post.destroy({ where: { id: id } });
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ status: false, message: 'server error' });
    }
    // res.status(204).json({ status: true, message: 'Ok' });
  },
};

//미들웨어 추가 !!
//belongsTo -> one to one / A.belongsTo(B)
//hasOne -> one to one / B.hasOne(A)
//hasMany -> one to many /

//lat,lng -> 소수로
