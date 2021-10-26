const express = require('express');

const postController = require('../controller/post');

const router = express.Router();

router.get('/:id', postController.getPost);
router.post('/', postController.uploadPost);
router.patch('/:id', postController.editPost);
router.delete('/:id', postController.deletePost);

module.exports.postRouter = router;
