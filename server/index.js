import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import AuthRouter from './router/auth.js';
import PostRouter from './router/post.js';
import UserRouter from './router/user.js';

const app = express();
const port = 8000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', AuthRouter);
app.use('/post', PostRouter);
app.use('/user', UserRouter);

app.listen(port, () => {
  console.log(`the server is running http://localhost:${port}`);
});
