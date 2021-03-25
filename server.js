const express = require('express');
const app = express()
const Sequelize = require("sequelize");
const sequelize = require('./util/database');
const Post = require('./models')

const postsRouter = require('./routes');

app.use("/api", postsRouter)

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
    Post.sequelize.sync({ force: true }).then(result=>{
        console.log('Подключение к базе данных...')
    }).catch(err=>console.log(err))
})