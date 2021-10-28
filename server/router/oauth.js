const express = require('express');

const oauthController = require('../controller/oauth');

const router = express.Router();

router.post('/google', oauthController.googleLogin);

module.exports.oauthRouter = router;
