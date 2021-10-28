require('dotenv').config();
const axios = require('axios');
const { user } = require('../models');

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
        console.log(issue.data);
        res.send(issue.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  userInfo: (req, res) => {
    const infoUrl = `https://www.googleapis.com/oauth2/v1/userinfo`;

    const access_token =
      'ya29.a0ARrdaM9M5LQCh2KoaKBVR7hZXL8Gg8T15pBONIFKmXuEWjnEYaBv7IXFYqneUwl-fx4vYFoz3GPzD3fy6pZwBFXVmHGY8XPzGfVXyAEQt_bVK2uQ3s3BTh3tEfaWyIaxnK0Bc2MiBiPMcu16m6Gcvan1v18S';

    axios
      .get(infoUrl, {
        headers: {
          authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((result) => {
        console.log(result);
        res.json(result.data);
      })
      .catch(console.log);
  },
};
