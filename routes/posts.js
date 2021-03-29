const express = require('express');
const postsRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const posts_controller = require('../controllers/posts');

// postsRouter.use(function (req, res, next) {
//     console.log(req.path);
//     next();
// });

postsRouter.get("/", posts_controller.getPosts);
postsRouter.get("/:id", posts_controller.getPostById);
postsRouter.post('/', jsonParser, posts_controller.createPost);
postsRouter.put('/:id', jsonParser, posts_controller.updatePost);
postsRouter.delete('/:id', jsonParser, posts_controller.deletePost);

module.exports = postsRouter;