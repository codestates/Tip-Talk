import express from 'express';
import * as categoryController from '../controller/category.js';

const router = express.Router();

router.get('/', categoryController.getAll);

router.post('/', categoryController.add);

router.delete('/:id', categoryController.deleteOne);

export default router;
