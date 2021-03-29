const Sequelize = require('sequelize');
const sequelize = new Sequelize("todo", "postgres", "user", {
    dialect: "postgres",
    host: "localhost"
});

module.exports = sequelize;