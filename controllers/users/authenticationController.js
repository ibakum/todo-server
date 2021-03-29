const Joi = require('joi');//validation
const models = require('../../models')
const User = models.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config =  require('../../config');

function Error(response) {
    return response.status(500).json({
        message: 'server error'
    })
}


module.exports.createUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user =  await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        return res.send(user)
    } catch (err) {
        return Error(res);
    }
}

module.exports.checkUser = async (req, res) => {
    const user = await User.findOne({ where: { name: req.body.name }})
    if(user === null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (isValidPassword) {
            const payload = { id: user.id };
            const token = jwt.sign(payload, config.jwtSecret, {
                expiresIn: config.tokenExpireTime})
            res.send({token})
        } else {
            res.send('Not Allowed')
        }
    } catch (err) {
        return Error(res);
    }
}


