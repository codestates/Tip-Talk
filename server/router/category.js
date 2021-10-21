import express from 'express';
import * as categoryController from '../controller/category.js';

const router = express.Router();

// * /category
router.get('/', categoryController.getAll);

// ToDo 유저 미들웨어 추가
router.post('/', categoryController.add);

// ToDo 유저 미들웨어 추가
router.delete('/:id', categoryController.deleteOne);

export default router;
