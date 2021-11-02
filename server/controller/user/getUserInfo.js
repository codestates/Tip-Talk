const { user } = require('../../models');

module.exports = async (req, res) => {
  // const accessToken = req.cookies.accessToken;
  const { id } = req.params;
  const { nickname, password, img } = req.body;
  const userInfo = await user.findOne({ where: { id } });
  if (!userInfo) {
    return res
      .status(400)
      .json({ status: false, message: '존재하지 않는 유저입니다.' });
  }
  return res.status(200).json({
    status: true,
    data: { nickname: nickname, password: password, img: img },
  });
};
