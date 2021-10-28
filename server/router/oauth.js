const express = require('express');

const oauthController = require('../controller/oauth');

const router = express.Router();

router.post('/google', oauthController.getToken);
router.get('/userinfo', oauthController.userInfo);

module.exports.oauthRouter = router;
