const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const users_controller = require('../controllers/users');

usersRouter.get("/users", users_controller.getUsers);
usersRouter.post("/users", jsonParser, users_controller.createUser);
usersRouter.post('/users/login', jsonParser, users_controller.checkUser);

module.exports = usersRouter;