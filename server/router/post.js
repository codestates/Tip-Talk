const express = require('express');
const { isLoggedIn, isAuth } = require('../middleware');
const { postController } = require('../controller/index');
const { upload } = require('../controller/service/uploadImage');

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.get('/around/:id', postController.getAround);
router.post(
  '/',
  isLoggedIn,
  isAuth,
  upload.array('images'),
  postController.uploadPost,
);
router.patch('/:id', isLoggedIn, isAuth, postController.editPost);
router.delete('/:id', isLoggedIn, isAuth, postController.deletePost);

module.exports.postRouter = router;
