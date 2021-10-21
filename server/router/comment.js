import express from 'express';
import * as commentController from '../controller/comment.js';

const router = express.Router();

router.get('/', commentController.getAll);

export default router;
