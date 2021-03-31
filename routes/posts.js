const express = require('express');
const postsRouter = express.Router();
const posts_controller = require('../controllers/posts');
const authMiddleware = require('../authMiddleware')

postsRouter.get("/", authMiddleware.checkAuth, posts_controller.getPosts);
postsRouter.get("/:id", authMiddleware.checkAuth, posts_controller.getPostById);
postsRouter.post('/', authMiddleware.checkAuth, posts_controller.createPost);
postsRouter.put('/:id', authMiddleware.checkAuth, posts_controller.updatePost);
postsRouter.delete('/:id', authMiddleware.checkAuth, posts_controller.deletePost);

module.exports = postsRouter;