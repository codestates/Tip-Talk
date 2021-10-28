const express = require('express');

const { oauthController } = require('../controller/index');

const router = express.Router();

router.post('/google', oauthController.googleLogin);

module.exports.oauthRouter = router;
