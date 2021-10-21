const express = require('express');
const categoryController = require('../controller/category');

const router = express.Router();

// * /category
router.get('/', categoryController.getAll);

// ToDo 유저 미들웨어 추가
router.post('/', categoryController.add);

// ToDo 유저 미들웨어 추가
router.delete('/:id', categoryController.deleteOne);

module.exports.categoryRouter = router;
