const Sequelize = require("sequelize");
const sequelize = require('../util/database');

const models = {
    Post: require('./post')(sequelize, Sequelize.DataTypes),
    User: require('./user')(sequelize, Sequelize.DataTypes)
}

Object.keys(models).forEach(modelName => {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
module.exports = models;