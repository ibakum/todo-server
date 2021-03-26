const express = require('express');
const app = express();
const Sequelize = require("sequelize");
const sequelize = require('./util/database');
const models = require('./models');
const router = require('./routes/posts.js');


app.use("/api", router);
// app.use("/api", usersRouter);

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
    models.sequelize.sync().then(result=>{
        console.log('Подключение к базе данных...')
    }).catch(err=>console.log(err))
})
// { force: true }