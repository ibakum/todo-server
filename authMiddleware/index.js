const jwt = require('jsonwebtoken');
const config = require('../config');
const Token = require('../services/token.js')

const checkAuth = (req, res, next) => {
    const rawToken = req.headers['authorization'];
    const token = rawToken.split(' ')[1];
    if (!token) {
         return res.status(403).send({ auth: false, message: 'Invalid token.' });
    }
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
        if (err) {
            return res.status(500).send({auth: false, message: 'Invalid token.'});
        }
        try {
            const tokenFromStorage = await Token.getToken(decoded.id)
            if (token === tokenFromStorage.accessToken){
                req.user = { id: decoded.id };
                next();
            } else {
                throw Error('Invalid token');
            }
        } catch (e) {
            return res.status(401).send({auth: false, message: 'Invalid token.'});
        }

    });
}

module.exports = {
    checkAuth
}