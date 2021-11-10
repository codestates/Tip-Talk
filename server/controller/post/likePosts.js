const { post, user_place_likes } = require('../../models');

module.exports = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const find = await user_place_likes.findAll({
    where: { userId: +userId },
    include: [
      {
        model: post,
        attributes: ['id', 'userId', 'title', 'images', 'views', 'likes'],
      },
    ],
  });
  res.status(200).json({ status: true, data: { find } });
};

// 내가 보고 싶은 사람의 찜한 포스트를 볼 수 있게
// 하나의 화면 안에 그럼 userId
