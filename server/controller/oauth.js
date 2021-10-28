require('dotenv').config();
const axios = require('axios');

module.exports = {
  getToken: (req, res) => {
    const { authorizationCode } = req.body;

    axios
      .post('https://oauth2.googleapis.com/token', {
        code: authorizationCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: process.env.GRANT_TYPE,
      })
      .then((issue) => {
        console.log(issue);
        res.send(issue.data);
      })
      .catch((err) => {
        console.log(err.message);
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
