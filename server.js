const express = require('express');
const app = express();
const Sequelize = require("sequelize");
const sequelize = require('./util/database');
const models = require('./models');
const router = require('./routes');

app.use(express.json());
app.use("/api", router);

const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
    models.sequelize.sync().then(result=>{
        console.log('Подключение к базе данных...')
    }).catch(err=>console.log(err))
})

// { force: true }