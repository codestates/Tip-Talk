const { user } = require('../models');

module.exports = async (req, res, next) => {
  const { nickname } = req.body;
  //닉네임 길이 확인(2글자에서 10글자)
  if (nickname.length < 2 || nickname.length > 10) {
    return res.status(400).json({
      status: false,
      message: '닉네임은 2자리에서 10자리까지 가능합니다',
    });
  }
  const userNickname = await user.findOne({
    where: {
      nickname: nickname,
    },
  });
  if (userNickname) {
    return res.status(409).send({ status: false, message: 'Already exist!' });
  }
  next();
};
