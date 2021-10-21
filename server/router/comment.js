const express = require('express');
const commentController = require('../controller/comment');

const router = express.Router();

// * /comment
router.get('/:postid', commentController.getAll);

// ToDo 유저 미들웨어 추가
router.post('/:postid', commentController.upload);

// ToDo 유저 미들웨어 추가
router.patch('/:commentid', commentController.update);

// ToDo 유저 미들웨어 추가
router.delete('/:commentid', commentController.deleteOne);

module.exports.commentRouter = router;
