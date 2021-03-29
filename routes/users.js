const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const users_controller = require('../controllers/users');

usersRouter.get("/", users_controller.getUsers);
usersRouter.post("/", jsonParser, users_controller.createUser);
usersRouter.post('/login', jsonParser, users_controller.checkUser);

module.exports = usersRouter;