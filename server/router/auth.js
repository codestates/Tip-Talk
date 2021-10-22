const express = require('express');

const authController = require('../controller/auth.js');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/signout', authController.signout);
router.delete('/deleteUser', authController.deleteUser);

module.exports.authRouter = router;
