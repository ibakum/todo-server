const Sequelize = require("sequelize");
const sequelize = new Sequelize("todo", "postgres", "user", {
    dialect: "postgres",
    host: "localhost"
});
const Joi = require('joi');
const User = require('../../models');
const bcrypt = require('bcrypt')

function Error(response) {
    return response.status(500).json({
        message: 'server error'
    })
}

// app.use(express.json())

module.exports.getUsers = (req, res) => {
    res.json(users)
}

module.exports.createUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(salt)
        console.log(hashedPassword)
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
}

module.exports.checkUser = async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if(user == null) {
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


