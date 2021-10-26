const express = require('express');

const googleController = require('../controller/google');

const router = express.Router();

router.post('/receive/token', googleController.getToken);
router.get('/receive/userinfo?', googleController.userInfo);

module.exports.googleRouter = router;
