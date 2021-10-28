const express = require('express');
const commentController = require('../controller/comment');

const router = express.Router();

// * /comment
router.get('/:postId', commentController.getAll);

// ToDo 유저 미들웨어 추가
router.post('/:postId', commentController.upload);

// ToDo 유저 미들웨어 추가
router.patch('/:commentId', commentController.update);

// ToDo 유저 미들웨어 추가
router.delete('/:commentId', commentController.deleteOne);

module.exports.commentRouter = router;
