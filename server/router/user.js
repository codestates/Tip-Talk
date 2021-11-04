const express = require('express');
const multer = require('multer');

const { userController } = require('../controller/index');

const router = express.Router();
const upload = multer();

router.get('/:id', userController.getUserInfo);
router.patch('/:id', upload.single('image'), userController.editUserInfo);

module.exports.userRouter = router;
