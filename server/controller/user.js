require('dotenv').config();
const { user } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  getUserInfo: async (req, res) => {
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
  },
  editUserInfo: async (req, res) => {
    // const accessToken = req.cookies.accessToken;
    const { id } = req.params;
    const { nickname, password, img } = req.body;
    const userInfo = await user.update(
      { nickname, password, img },
      {
        where: { id },
      },
    );
    if (!userInfo) {
      return res
        .status(400)
        .json({ status: false, message: '존재하지 않는 유저입니다.' });
    }
    return res.status(200).json({ status: true });
  },
};

//role -> 0관리자 1소비자 2사업자
