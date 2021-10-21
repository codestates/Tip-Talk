const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AuthRouter = require('./router/auth.js');
const PostRouter = require('./router/post.js');
const UserRouter = require('./router/user.js');

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
