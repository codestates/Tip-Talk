const express = require('express');
const multer = require('multer');

const postController = require('../controller/post');

const router = express.Router();
const upload = multer();

router.get('/:id', postController.getPost);
router.post('/', upload.array(), postController.uploadPost);
router.patch('/:id', postController.editPost);
router.delete('/:id', postController.deletePost);

module.exports.postRouter = router;
