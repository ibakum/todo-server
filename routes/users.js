const express = require('express');
const usersRouter = express.Router();

const users_controller = require('../controllers/users');

usersRouter.post("/", users_controller.createUser);
usersRouter.post('/login', users_controller.checkUser);
usersRouter.post('/token', users_controller.createRefreshToken);
usersRouter.delete('/logout', users_controller.deleteToken);


module.exports = usersRouter;