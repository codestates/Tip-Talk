const express = require('express');

const authController = require('../controller/auth.js');
const {
  isValidEmail,
  isValidNickname,
  lengthPassword,
} = require('../controller/auth.js');

const router = express.Router();

router.post('/login', lengthPassword, authController.login);
router.post(
  '/signup',
  isValidEmail,
  isValidNickname,
  lengthPassword,
  authController.signup,
);
router.post('/signout', authController.signout);
router.delete('/deleteUser', authController.deleteUser);

module.exports.authRouter = router;
