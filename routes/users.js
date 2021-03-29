const express = require('express');
const usersRouter = express.Router();

const users_controller = require('../controllers/users');

usersRouter.post("/", users_controller.createUser);
usersRouter.post('/login', users_controller.checkUser);

module.exports = usersRouter;