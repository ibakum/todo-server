const Sequelize = require('sequelize');
const sequelize = new Sequelize("todo", "userpostgres", "postgres", {
    dialect: "postgres",
    host: "localhost"
});

module.exports = sequelize;