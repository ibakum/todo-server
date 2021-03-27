const Joi = require('joi');
const models = require('../../models')
const User = models.User;
const bcrypt = require('bcrypt')

function Error(response) {
    return response.status(500).json({
        message: 'server error'
    })
}

// app.use(express.json())

module.exports.getUsers = async function (req, res) {
    try {
        const data = await User.findAll({raw: true})
        res.send(data);
    } catch (err) {
        return Error(res);
    }
};

module.exports.createUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user =  await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        return res.send(user)
    } catch {
        res.status(500).send()
    }
}

module.exports.checkUser = async (req, res) => {
    const user = await User.findOne({ where: {name: req.params.name}})
    if(user === null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
}


