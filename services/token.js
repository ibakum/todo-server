const config =  require('../config');
const jwt = require('jsonwebtoken');
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");

class Token {
    constructor() {
        this._tokens = promisify(client.get).bind(client);
    }

    _generateAccessToken(user) {
        const payload = { id: user.id };
        return jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.tokenExpireTime })
    }

    _generateRefreshToken(user) {
        const payload = { id: user.id };
        return jwt.sign(payload, config.jwtRefreshSecret)
    }

    addToken(user) {
        const token = {
            accessToken: this._generateAccessToken(user),
            refreshToken: this._generateRefreshToken(user)
        }
        this._tokens.set( user.id, token )
    }

    deleteToken(id) {
        this._tokens.delete(id)
    }

    get tokens(){
        return this._tokens;
    }
}
// const tokenService = new Token();
module.exports = new Token();

