const Sequelize = require("sequelize");
const sequelize = new Sequelize("posts", "postgres", "user", {
    dialect: "postgres",
    host: "localhost"
});
const Joi = require('joi');
const Post = require('../../models')

function Error(response) {
    return response.status(500).json({
        message: 'server error'
    })
}


module.exports.getPosts = async function (req, res) {
    try {
        const data = await Post.findAll({raw: true})
        res.send(data);
    } catch (err) {
        return Error(res);
    }
};

module.exports.createPost = async function (req, res) {
    try {
        const schema = Joi.object({
            text: Joi.string().min(1).max(100).required(),
            completed: Joi.boolean()
        });
        const {value: {text, completed}, error} = schema.validate(req.body);
        if (error) {

            return res.status(422).json({
                message: 'Invalid request',
                data: error
            })
        }
        const post = await Post.create({
            text: text,
            completed: completed
        })
        return res.send(post)
    } catch (err) {
        console.log(err)
        return Error(res)
    }
}

module.exports.getPostById = async function (req, res) {
    try {
        const data = await Post.findByPk(req.params.id)
        res.send(data);
    } catch (err) {
        return Error(res);
    }
};

module.exports.updatePost = async function (req, res) {
    try {
        const {text, completed} = req.body;
        console.log(req.params.id);
        const data = await Post.update({
            text,
            completed
        }, {
            where: {
                id: req.params.id
            },
            returning: true,
        })
        console.log(data);
        res.send(data);
    } catch (err) {
        return Error(res);
    }
};

module.exports.deletePost = async function (req, res) {
    try {
        const data = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send(data);
    } catch (err) {
        return Error(res);
    }
};
