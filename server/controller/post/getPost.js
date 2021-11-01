const { post, user, categories } = require('../models');

module.exports = async (req, res) => {
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
};
