const express = require('express');

const { login, signup, signout, deleteUser } = require('../controller/auth.js');


const router = express.Router();

router.post('/', login);
router.post('/', signup);
router.post('/', signout);
router.delete('/', deleteUser);

module.exports.authRouter = router;
