const express = require('express');
const app = express();
const models = require('./models');
const router = require('./routes');
const handleError = require('./services/handleError.js')

app.use(express.json());
app.use("/api", router);

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
    models.sequelize.sync().then(result=>{
        console.log('Подключение к базе данных...')
    }).catch(err=>console.log(err))
})
