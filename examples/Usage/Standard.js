const { Standard } = require("../../index.js");

(async () => {
    //Searching for username
    let users = await Standard.Search('Hikaru')
    let user = users[0];
    console.log(user, user.username);

    //User Info
    let info = await Standard.User(user.username);
    console.log(info);

    //User Stats
    let stats = await Standard.Stats('Hikaru');
    console.log(stats);

    //User Games
    let games = await Standard.Games('Hikaru');
    console.log(games);

    //User Live Games
    let live = await Standard.Games('Hikaru', true);
    console.log(live)

    //Get info on a Game
    let gameId = games[0].id;
    let game = await Standard.Game(gameId)
    console.log(game)

    //Now Decode the move list
    let moveList = game.game.moveList;
    let moves = await Standard.DecodeMoves(moveList);
    console.log(moves)
})()