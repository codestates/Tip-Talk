const express = require('express');
const multer = require('multer');
const { isLoggedIn, isAuth } = require('../middleware');
const { postController } = require('../controller/index');

const router = express.Router();
const upload = multer();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.get('/around/:id', postController.getAround);
router.post('/', isLoggedIn, isAuth, upload.array(), postController.uploadPost);
router.patch('/:id', isLoggedIn, isAuth, postController.editPost);
router.delete('/:id', isLoggedIn, isAuth, postController.deletePost);

module.exports.postRouter = router;
