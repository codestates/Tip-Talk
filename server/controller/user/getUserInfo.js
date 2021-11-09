const { user } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const userInfo = await user.findOne({
    where: { id },
    attributes: ['id', 'nickname', 'email', 'img', 'role', 'platform'],
  });

  if (!userInfo) {
    return res
      .status(400)
      .json({ status: false, message: '존재하지 않는 유저입니다.' });
  }

  const { email, nickname, password, img, role, platform } = userInfo;

  return res.status(200).json({
    status: true,
    data: { user: userInfo },
  });
};
