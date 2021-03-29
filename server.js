const express = require('express');
const app = express();
const Sequelize = require("sequelize");
const sequelize = require('./util/database');
const models = require('./models');
const router = require('./routes');

app.use("/api", router);

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
    models.User.sequelize.sync({ force: true }).then(result=>{
        console.log('Подключение к базе данных...')
    }).catch(err=>console.log(err))
})