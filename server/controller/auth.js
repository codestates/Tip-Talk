require('dotenv').config();
const { user } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  isValidEmail: async (req, res, next) => {
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
  },
  isValidNickname: async (req, res, next) => {
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
  },
  lengthPassword: async (req, res, next) => {
    const { password } = req.body;
    if (password.length < 8) {
      return res
        .status(400)
        .json({ status: false, message: '비밀번호는 8자리 이상이여야합니다.' });
    }
    next();
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userInfo = await user.findOne({
        where: { email: email, password: password },
      });
      if (!userInfo) {
        res.status(403).json({
          status: false,
          message: '이메일 혹은 비밀번호가 일치하지 않습니다.',
        });
      } else {
        const accessToken = jwt.sign(
          userInfo.dataValues,
          process.env.ACCESS_SECRET,
        );
        res.cookie('accessToken', accessToken, {
          SameSite: 'none',
          Secure: true,
          HttpOnly: true,
        });
        res
          .status(200)
          .json({ status: true, data: { email: email, password: password } });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: 'server error' });
    }
  },

  signup: async (req, res) => {
    try {
      const { email, nickname, password } = req.body;

      if (!email || !nickname || !password) {
        return res
          .status(400)
          .json({ status: false, message: '모든 항목을 입력해야 합니다.' });
      }
      const userInfo = await user.findOne({
        where: {
          email: email,
          nickname: nickname,
          password: password,
        },
      });
      if (userInfo === null) {
        const newUserId = await user.create({
          email: email,
          nickname: nickname,
          password: password,
        });
        const accessToken = jwt.sign(
          newUserId.dataValues,
          process.env.ACCESS_SECRET,
        );
        res.cookie('accessToken', accessToken, {
          SameSite: 'none',
          Secure: true,
          HttpOnly: true,
        });
        res.status(201).json({
          status: true,
          data: { email: email, nickname: nickname, password: password },
        });
      } else {
        res
          .status(409)
          .json({ status: false, message: '중복된 이메일입니다.' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: 'server error' });
    }
  },

  signout: async (req, res) => {
    await res
      .clearCookie('accessToken')
      .status(200)
      .json({ status: true, message: '로그아웃 하였습니다.' });
  },

  deleteUser: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
      if (userInfo) {
        await user
          .destroy({ where: { email: userInfo.email } })
          .then(
            res
              .clearCookie('accessToken')
              .status(200)
              .json({ status: true, message: '회원 탈퇴 성공하였습니다.' }),
          );
      } else if (!userInfo) {
        res
          .status(403)
          .json({ status: false, message: '권한이 없는 요청입니다.' });
      } else {
        res
          .status(401)
          .json({ status: false, message: '유효하지 않은 접근입니다.' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: 'server error' });
    }
  },
};

//role: 관리자랑 사용자 나누는거 role-> number
