const Sequelize = require('sequelize');
const sequelize = new Sequelize("posts", "postgres", "user", {
    dialect: "postgres",
    host: "localhost"
});

module.exports = sequelize;