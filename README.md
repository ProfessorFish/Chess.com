# Chess.com

A nodeJS package that utilises the internal API for chess.com, allowing for verbose live-updating information.

## Features:
- Search for a user
- Fetch user's information
- Fetch user's past games
- Fetch user's live/ongoing games
- Fetch user's variants stats
- Fetch user's status

## Benefits:
- Supports variants
- Information is updated real-time with the chess.com servers (as opposed to every x time frame with the public API)

## TODO:
### Additions:

 - [ ]  Add fetching leader-boards
 - [ ]  Add get user's friends
 - [ ]  Add support for clubs
 - [ ]  Add support for leagues
 - [ ] Add game fetching for variants

### Bug fixes:
- [ ] Fix unable to view some live games bug

## Simple usage:
```js
const  { Standard } =  require("chesscom");
Standard.Search("Hikaru").then(async users =>{
	let hikaru = users[0];
	
	let profile = await Standard.User(hikaru.username);
	console.log(profile);

	let stats = await Standard.Stats(hikaru.username);
	console.log(stats);
})
```

# Documentation:

## Standard:

### DecodeMoves(moveList)
#### <ins>**Params**</ins>:
moveList - string (The string provided by [Standard.Game()](#game)
#### <ins>**Description:**</ins>
Decodes the moveList provided by [Standard.Game()](#game%28gameid,-type%29)
#### <ins> **Usage:** </ins>
```js
const { Standard } = require("chesscom");

Standard.Games('some-user').then(async games => {
	let chosenGame = games[0];

	let game = await Standard.Game(chosenGame.id);
	
	let moves = Standard.DecodeMoves(game.game.moveList);
	console.log(moves);
	/*
	[
		{ "from": "..", "to": ".."},
		...
	]
	*/
})
```

---

### Game(gameId, type)
#### <ins>**Params**</ins>:
gameId - string/int (The ID provided by [Standard.Games()](#Games))
type - string (Can be one of [Standard.GAMES](#Standard.GAMES))
#### <ins>**Description:**</ins>
Gets information on a game [Standard.Game()](#Game)
#### <ins> **Usage:** </ins>
```js
const { Standard } = require("chesscom");

Standard.Games('some-user').then(async games => {
	let chosenGame = games[0];

	let game = await Standard.Game(chosenGame.id);
	console.log(game);
	/*
	{
		{
			"game":
				{
					"id",
					"initialSetup",
					"plyCount",
					"startTime",
					"endTime",
					"colorOfWinner"
					...
				},
			"players": {
				...
			}
	}
	*/
})
```
