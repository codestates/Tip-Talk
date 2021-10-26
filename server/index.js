const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { authRouter } = require('./router/auth');
const { postRouter } = require('./router/post');
const { userRouter } = require('./router/user');
const { commentRouter } = require('./router/comment');
const { categoryRouter } = require('./router/category');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);
app.use('/category', categoryRouter);

app.listen(port, () => {
  console.log(`the server is running http://localhost:${port}`);
});
