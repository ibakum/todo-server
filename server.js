const express = require('express');
const app = express()
const Sequelize = require("sequelize");
const sequelize = new Sequelize("posts", "postgres", "user", {
    dialect: "postgres",
    host: "localhost"
});


const usersRouter = require('./routes');

app.use("/api", usersRouter)

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
    sequelize.sync().then(result=>{
        console.log('Подключение к базе данных...')
    }).catch(err=>console.log(err))
})