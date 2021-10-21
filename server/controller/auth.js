require('dotenv').config();
const { user } = require('../models');
const jwt = require('jsonwebtoken');

// export function login(req, res) {
//   res.status(200).send('done');
// }

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userInfo = await user.findOne({
        where: { email: email, password: password },
      });
      if (!userInfo) {
        res
          .status(403)
          .send({ message: '이메일 혹은 비밀번호가 일치하지 않습니다.' });
      } else {
        const accessToken = jwt.sign(
          userInfo.dataValues,
          process.env.ACCESS_SECRET,
        );
        res.cookie("accessToken", accessToken, {SameSite = 'none', Secure = true, HttpOnly = true})
        res.status(200).send({message: 'ok'})
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  },

  signup: async (req, res) => {
    try{
      const { email, nickname, password } = req.body;
      if (!email || !nickname || !password) {
        return res.status(400).send({ message: "모든 항목을 입력해야 합니다." });
      }
      const userInfo = await user.findOne({
        where: {
          email: email,
          nickname: nickname,
          password: password
        },
      });
      if (userInfo === null) {
        const newUserId = await user.create({
          email: email,
          nickname: nickname,
          password: password
        })
        const accessToken = jwt.sign(
          newUserId.dataValues,
          process.env.ACCESS_SECRET,
        );
        res.cookie("accessToken", accessToken, {SameSite = 'none', Secure = true, HttpOnly = true})
        res.status(201).send({message: "created!"})
      } else {
        res.status(409).send({message: "중복된 이메일입니다."})
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "server error"})
    }
  },

  signout: async (req, res) => {
    await res.clearCookie('accessToken').status(200).send({message: "로그아웃 하였습니다."})
  },

  deleteUser: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken
      const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET)
      if (userInfo) {
        await user.destroy({ where: { email: userInfo.email}})
        .then(res.clearCookie('accessToken').status(200).send({message: "회원 탈퇴 성공하였습니다." }))
      } else if (!userInfo) {
        res.status(403).send({message: "권한이 없는 요청입니다."})
      } else {
        res.status(401).send({message: "유효하지 않은 접근입니다."})
      }
    }
    catch (err) {
      console.log(err);
      res.status(500).send({message: "server error"})
    }
  },
};
