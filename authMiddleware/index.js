const jwt = require('jsonwebtoken');
const config = require('../config');
const Token = require('../services/token.js')

const checkAuth = (req, res, next) => {
    const rawToken = req.headers['authorization'];
    const token = rawToken.split(' ')[1];
    if (!token) {
         return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        }
        Token.addToken({ id: decoded.id })
        console.log(token)
        if (token === Token.tokens.get(decoded.id)){
            console.log(token)
            console.log('Success')
        }
        req.user = { id: decoded.id };
        console.log(Token.tokens.get({id: decoded.id}))
        next();
    });
}

module.exports = {
    checkAuth
}