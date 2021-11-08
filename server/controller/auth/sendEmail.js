const nodemailer = require('nodemailer');
require('dotenv').config();

function generateRandomNumber(n) {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

module.exports = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const randomNumber = generateRandomNumber(6);
    //const logo = '';
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: 'Tip Talk 이메일 인증번호입니다.',
      html: `<div><h1>Tip Talk 이메일 인증번호입니다.</h1><h2>이메일 인증을 하셔야지 회원가입이 가능합니다.</h2><h3 style="margin-bottom:130px">TipTalk 인증번호 : ${randomNumber}</h3></div>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
      res.send({ data: info });
    });
    return res.status(200).json({ data: { number: randomNumber } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: 'server errrrr' });
  }
};
