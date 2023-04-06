module.exports = class Standard{
    static GAME = {
        DAILY: 'daily',
        LIVE: 'live',
        COMPUTER: 'computer',
        BOT: 'computer'
    }

    constructor(){

    }

    static DecodeMoves(moveString){
        return require("./Functions/DecodeMoves.js").apply(this, [moveString]);
    }

    static async Game(id, type){
        let funct = require("./Functions/Game.js")
        switch (type){
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

    static async Games(username, live){
        return await require("./Functions/Games.js").apply(this, [username, live]);
    }

    static async Search(username){
        return await require("./Functions/Search.js").apply(this, [username]);
    }

    static async Stats(username){
        return await require("./Functions/Stats.js").apply(this, [username]);
    }

    static async User(username){
        return await require("./Functions/User.js").apply(this, [username]);
    }
}