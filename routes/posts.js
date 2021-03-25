const express = require('express');
const postsRouter = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const posts_controller = require('../controllers/posts');

postsRouter.use(function (req, res, next) {
    console.log(req.path);
    next();
});

postsRouter.get("/posts", posts_controller.getPosts);
postsRouter.post('/posts', jsonParser, posts_controller.createPost);

module.exports = postsRouter;