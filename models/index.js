const Sequelize = require("sequelize");
const sequelize = new Sequelize("posts", "postgres", "user", {
    dialect: "postgres",
    host: "localhost"
});
const path = require('path');

const models = {
    Post: require(path.join(__dirname, './post'))(sequelize, Sequelize.DataTypes),
    User: require(path.join(__dirname, './user'))(sequelize, Sequelize.DataTypes)
}


Object.keys(models).forEach(modelName => {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
module.exports = models;