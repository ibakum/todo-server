const express = require('express');
const usersRouter = express.Router();
const authMiddleware = require('../authMiddleware')
const users_controller = require('../controllers/users');

usersRouter.post("/", users_controller.registerUser);
usersRouter.post('/login', users_controller.loginUser);
usersRouter.post('/token', users_controller.createRefreshToken);
usersRouter.delete('/logout', authMiddleware.checkAuth, users_controller.deleteToken);

module.exports = usersRouter;