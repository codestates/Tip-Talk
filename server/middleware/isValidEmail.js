const { user } = require('../models');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const regex = email.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
  if (!regex) {
    return res
      .status(400)
      .json({ status: false, message: '이메일 형식이 맞지 않습니다.' });
  }
  const userEmail = await user.findOne({
    where: {
      email: email,
    },
  });
  if (userEmail) {
    return res.status(409).send({ status: false, message: 'Already exist!' });
  }
  next();
};
