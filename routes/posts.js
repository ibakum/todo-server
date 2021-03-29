const express = require('express');
const postsRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const posts_controller = require('../controllers/posts');

// postsRouter.use(function (req, res, next) {
//     console.log(req.path);
//     next();
// });

postsRouter.get("/posts", posts_controller.getPosts);
postsRouter.get("/posts/:id", posts_controller.getPostById);
postsRouter.post('/posts', jsonParser, posts_controller.createPost);
postsRouter.put('/posts/:id', jsonParser, posts_controller.updatePost);
postsRouter.delete('/posts/:id', jsonParser, posts_controller.deletePost);

module.exports = postsRouter;