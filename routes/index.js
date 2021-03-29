const postsRouter = require('./posts.js');
const usersRouter = require('./users.js');
const express = require('express');
const app = express();
const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);
module.exports = apiRouter;

