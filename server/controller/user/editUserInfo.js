const { user } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  // const accessToken = req.cookies.accessToken;
  const { id } = req.params;
  const { nickname, password, img, role } = req.body;
  //bcrypt 사용, role 추가
  const userInfo = await user.update(
    { nickname, password, img, role },
    {
      where: { id },
    },
  );
  if (!userInfo) {
    return res
      .status(400)
      .json({ status: false, message: '존재하지 않는 유저입니다.' });
  } else {
    bcrypt.compare(password, userInfo.password, function (err, result) {
      if (err) {
        throw err;
      } else {
        return res.status(200).json({ status: true });
      }
    });
  }
};
