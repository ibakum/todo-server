const jwt = require('jsonwebtoken');
const config = require('../config');

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
        req.user = { id: decoded.id };
        next();
    });
}
module.exports = {
    checkAuth
}