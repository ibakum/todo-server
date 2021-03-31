const {RedisClient} = require("redis");
const { promisify } = require("util");
const redisPort = 6379;

class Client {
    constructor() {
        this._client = new RedisClient();
        this._getAsync = promisify(this._client.get).bind(this._client);
        this._setAsync = promisify(this._client.set).bind(this._client);
        this._clearAsync = promisify(this._client.del).bind(this._client);
    }

    async get(key){
        const value = await this._getAsync(key);
        return JSON.parse(value);
    }

    async set(key, value) {
        return await this._setAsync(key, JSON.stringify(value));
    }

    async clear(key){
        return await this._clearAsync(key);
    }
}

module.exports = new Client();