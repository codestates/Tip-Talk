const express = require('express');

const router = express.Router();

router.get('/', getPost);

export default router;
