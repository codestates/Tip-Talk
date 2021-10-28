const express = require('express');

const googleController = require('../controller/google');

const router = express.Router();

router.post('/token', googleController.getToken);
router.get('/userinfo?', googleController.userInfo);

module.exports.googleRouter = router;
