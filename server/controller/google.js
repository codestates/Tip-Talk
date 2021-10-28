require('dotenv').config();
const axios = require('axios');

module.exports = {
  getToken: async (req, res) => {
    const { authorizationCode } = req.body;
    const code = authorizationCode;
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    const grant_type = process.env.GRANT_TYPE; //grant type = 허가를 받는 방식
    const url = `https://oauth2.googleapis.com/token`;

    console.log(authorizationCode);
    await axios
      .post(
        url,
        {
          code,
          client_id,
          client_secret,
          redirect_uri,
          grant_type,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((issue) => {
        res.send(issue.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  userInfo: async (req, res) => {
    const infoUrl = `https://www.googleapis.com/oauth2/v2/userinfo`;
    const access_token = req.query.accessToken;

    await axios
      .get(infoUrl, {
        headers: {
          authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((result) => {
        res.json(result.data);
      });
  },
};
