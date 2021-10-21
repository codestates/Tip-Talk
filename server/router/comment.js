import express from 'express';
import * as commentController from '../controller/comment.js';

const router = express.Router();

router.get('/:postid', commentController.getAll);
router.post('/:postid', commentController.upload);
router.patch('/:commentid', commentController.update);
router.delete('/:commentid', commentController.deleteOne);

export default router;
