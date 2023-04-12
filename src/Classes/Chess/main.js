module.exports = class Standard {
    static GAME = {
        DAILY: 'daily',
        LIVE: 'live',
        COMPUTER: 'computer',
        BOT: 'computer'
    }

    constructor(email, password, username) {
        this.EMAIL = email || process.env.EMAIL;
        this.PASSWORD = password || process.env.PASSWORD;
        this.USERNAME = username || process.env.USERNAME;
    }


    async Init() {
        return await require("./Functions/Init.js").apply(this, [])
    }

    async VariantStats(username) {
        return await require("./Functions/VariantStats.js").apply(this, [username]);
    }

    async Friends(username, pages, avatarSize) {
        return require("./Functions/Friends.js").apply(this, [username, pages, avatarSize]);
    }

    //All used in initialisation (Don't need to call them on their own ever)
    async GetToken() {
        return await require("./Functions/GetToken.js").apply(this, []);
    }

    async GetSessionID() {
        return await require("./Functions/GetSessionID.js").apply(this, []);
    }

    DecodeMoves(moveString) {
        return require("./Functions/DecodeMoves.js").apply(this, [moveString]);
    }

    async Game(id, type) {
        let funct = require("./Functions/Game.js")
        switch (type) {
            case 'daily':
                return await funct.apply(this, [id, false, true, false]);
                break;
            case 'live':
                return await funct.apply(this, [id, true, false, false]);
                break;
            case 'computer':
                return await funct.apply(this, [id, false, false, true]);
                break;
            default:
                return await funct.apply(this, [id, false, false, false]);
                break;
        }
    }

    async Games(username, live) {
        return await require("./Functions/Games.js").apply(this, [username, live]);
    }

    async Search(username) {
        return await require("./Functions/Search.js").apply(this, [username]);
    }

    async Stats(username) {
        return await require("./Functions/Stats.js").apply(this, [username]);
    }

    async User(username) {
        return await require("./Functions/User.js").apply(this, [username]);
    }
}