module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })
    }

    return Post;
};