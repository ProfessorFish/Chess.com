
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

  

- [ ] Add fetching leader-boards

- [ ] Add get user's friends

- [ ] Add support for clubs

- [ ] Add support for leagues

- [ ] Add game fetching for variants

  

### Bug fixes:

- [ ] Fix unable to view some live games bug

  

## Simple usage:

```js

const { Standard } =  require("chesscom");

Standard.Search("Hikaru").then(async  users  =>{

let hikaru = users[0];

let profile =  await Standard.User(hikaru.username);

console.log(profile);

  

let stats =  await Standard.Stats(hikaru.username);

console.log(stats);

})

```

  

# Documentation:

  

## Standard:

<a  name="decode-moves"></a>

### DecodeMoves(moveList)

#### <ins>**Params**</ins>:

moveList - string (The string provided by [Standard.Game()](#game)

#### <ins>**Description:**</ins>

Decodes the moveList provided by [Standard.Game()](#game)
[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/DecodeMoves.json)

#### <ins> **Usage:** </ins>

```js
const { Standard } =  require("chesscom");

  

Standard.Games('some-user').then(async  games  => {

let chosenGame = games[0];

  

let game =  await Standard.Game(chosenGame.id);

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
<a  name="game"></a>

### Game(gameId, type)
#### <ins>**Params**</ins>:

gameId - string/int (The ID provided by [Standard.Games()](#games))

type - string (Can be one of [Standard.GAMES](#standard-games))

#### <ins>**Description:**</ins>

Gets information on a game from [Standard.Games()](#games)
[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Game.json)


#### <ins> **Usage:** </ins>

```js
const { Standard } =  require("chesscom");  

Standard.Games('some-user').then(async  games  => {
	let chosenGame = games[0];
	
	let game =  await Standard.Game(chosenGame.id);
	console.log(game);

	/*
		{
			{
				"game": {
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

---
<a  name="games"></a>

### Games(username)
#### <ins>**Params**</ins>:
username- string (The Chess.com username)
#### <ins>**Description:**</ins>
Gets a list of recent games played by user.
[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Games.json)


#### <ins> **Usage:** </ins>

```js
const { Standard } =  require("chesscom");  

Standard.Games('some-user').then(async  games  => {
	console.log(games);
})
```