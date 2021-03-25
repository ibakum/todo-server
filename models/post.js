const Sequelize = require("sequelize");
const sequelize = require("../util/database")

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        completed: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return Post;
};