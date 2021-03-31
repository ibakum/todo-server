const Joi = require('joi');//validation
const models = require('../../models')
const User = models.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config =  require('../../config');
const customError = require('../../services/customError.js')
const Token = require('../../services/token.js')

module.exports.registerUser = async (req, res) => {
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
        return customError(res);
    }
}

module.exports.loginUser = async (req, res) => {
    const user = await User.findOne({ where: { name: req.body.name }})
    if(user === null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (isValidPassword) {
            await Token.addToken(user)
            res.json(await Token.getToken(user.id))
        } else {
            res.send('Not Allowed')
        }
    } catch (err) {
        return customError(res);
    }
}

module.exports.createRefreshToken = (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken === null) {
        return res.sendStatus(401)
    }
    jwt.verify(refreshToken, config.jwtRefreshSecret, async (err, user) => {
        if (err) {
            return customError(res);
        }
        try {
            await Token.addToken({ id: user.id })
            res.json(await Token.getToken(user.id))
        } catch (err) {
            return customError(res);
        }
    })
}

module.exports.deleteToken =  async (req, res) => {
    await Token.deleteToken(req.user.id)
    res.sendStatus(204)
}