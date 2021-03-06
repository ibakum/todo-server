const Joi = require('joi');
const models = require('../../models')
const Post = models.Post;
const handleError = require('../../services/handleError.js')

module.exports.getPosts = async function (req, res) {
    try {
        const data = await Post.findAll({
            where: {
                userId: req.user.id
            }
        })
        res.send(data);
    } catch (err) {
        return handleError(err);
    }
};

module.exports.getPostById = async function (req, res) {
    try {
        const data = await Post.findByPk(req.params.id)
        if(req.user.id === data.userId) {
            res.send(data);
        } else {
            throw new Error('Not authorized');
        }
    } catch (err) {
        return handleError(err);
    }
};

module.exports.createPost = async function (req, res) {
    try {
        const schema = Joi.object({
            text: Joi.string().min(1).max(100).required(),
            completed: Joi.boolean()
        });
        const {value: { text, completed }, error} = schema.validate(req.body);
        if (error) {
            return res.status(422).json({
                message: 'Invalid request',
                data: error
            })
        }
        const post = await Post.create({
            userId: req.user.id,
            text,
            completed
        })
        return res.send(post)
    } catch (err) {
        return handleError(err);
    }
}

module.exports.updatePost = async function (req, res) {
    try {
        const { userId, text, completed } = req.body;
        const data = await Post.update({
            userId,
            text,
            completed
        }, {
            where: {
                id: req.params.id,
                userId: req.user.id
            },
            returning: true,
        })
        res.send(data);
    } catch (err) {
        return handleError(err);
    }
};

module.exports.deletePost = async function (req, res) {
    try {
        const data = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        })
        res.send(data);
    } catch (err) {
        return handleError(err);
    }
};
