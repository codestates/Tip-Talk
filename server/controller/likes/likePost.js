const { user_place_likes } = require('../../models');
const findById = require('../post/findById');

module.exports = async (req, res) => {
  const { postId } = req.params;

  try {
    const findPost = await findById(postId);

    if (!findPost) {
      return res
        .status(404)
        .json({ status: false, message: '존재하지 않는 게시글입니다.' });
    }

    const isLike = await user_place_likes.findOne({
      where: { userId: req.user.id, postId },
    });

    if (isLike) {
      await user_place_likes.destroy({ where: { id: isLike.id } });
      return res.status(200).json({ status: true, data: null });
    } else {
      const created = await user_place_likes.create({
        userId: req.user.id,
        postId,
      });

      res.status(201).json({ status: true, data: created });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
