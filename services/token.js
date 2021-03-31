const config =  require('../config');
const jwt = require('jsonwebtoken');
const Client = require('../services/redis.js');

class Token {
    constructor(client) {
        this._redis = client;
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

    async addToken(user) {
        const token = {
            accessToken: this._generateAccessToken(user),
            refreshToken: this._generateRefreshToken(user)
        }
        await this._redis.set( user.id, token )
    }

    async getToken(id) {
        return await this._redis.get(id)
    }

    async deleteToken(id) {
        return await this._redis.clear(id)
    }
}

module.exports = new Token(Client);

