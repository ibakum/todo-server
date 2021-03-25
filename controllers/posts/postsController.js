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
        console.log(req.body)
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


// User.findAll({where:{name: "Tom"}, raw: true })
//     .then(users=>{
//         console.log(users);
//     }).catch(err=>console.log(err));
//
// User.findByPk(2)
//     .then(user=>{
//         if(!user) return; // если пользователь не найден
//         console.log(user.name);
//     }).catch(err=>console.log(err));
//
// User.update({ age: 36 }, {
//     where: {
//         name: "Bob"
//     }
// }).then((res) => {
//     console.log(res);
// });
//
// User.destroy({
//     where: {
//         name: "Bob"
//     }
// }).then((res) => {
//     console.log(res);
// });