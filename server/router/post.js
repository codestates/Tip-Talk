const express = require('express');
const { getPost } = require('../controller/post');

const router = express.Router();

router.get('/', getPost);

module.exports.postRouter = router;
