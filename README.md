
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
					"colorOfWinner",
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

### Games(username, live)
#### <ins>**Params**</ins>:
username - string (The Chess.com username)
live - boolean (Whether to look for user's live games. [Can be used to get a user's status])
#### <ins>**Description:**</ins>
Gets a list of recent games played by user.

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Games.json)

[See Returns - Live Games](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Games_Live.json)

#### <ins> **Usage:** </ins>

```js
const { Standard } =  require("chesscom");  

Standard.Games('some-user').then(games  => {
	console.log(games);
	/*
		[
			{
				"id",
				"fen",
				"daysPerTurn",
				"moves",
				"user1Rating",
				"user2Rating",
				"user1Result",
				"user2Result",
				...
			},
			...
		]
	*/
})

Standard.Games('some-user').then(liveGames => {
	console.log(liveGames);
	/*
		{
			"id",
			"status",
			"statusAt",
			"updatedAt",
			"activity",
			"activityContext",
			...
	}
	*/
})
```

---
<a  name="search"></a>

### Search(username, live)
#### <ins>**Params**</ins>:
username - string (The Chess.com username)
#### <ins>**Description:**</ins>
Gets a list of users that match the username query.

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Search.json)

#### <ins> **Usage:** </ins>

```js
const { Standard } =  require("chesscom");  

Standard.Search('some-username').then(users => {
	console.log(users);
	/*
		[
			{
				"uuid",
				"name",
				"fair_play_vetted_time",
				"id",
				"country_id",
				"avatar_url",
				"member_url",
				"last_login_date",
				"location",
				"username",
				...
			},
			...
		]
	*/
})
```
---
<a  name="search"></a>

### Stats(username)
#### <ins>**Params**</ins>:
username - string (The Chess.com username)
#### <ins>**Description:**</ins>
Gets the specified user's standard chess statistics.

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Stats.json)

#### <ins> **Usage:** </ins>

```js
const { Standard } =  require("chesscom");  

Standard.Stats('some-username').then(stats => {
	console.log(stats);
	/*
		{
			"stats": [
				{
					"key": "rapid",
					"stats": {
						"rating": 2822,
						"highest_rating": 2927,
						"highest_rating_date": "2022-02-26T11:08:34-08:00",
						"rating_time_change_days": 30,
						"rating_time_change_value": -17,
						"total_game_count": 710,
						"total_win_count": 435,
						"total_loss_count": 65,
						"total_draw_count": 210,
						"avg_opponent_rating": 2655.84,
						"highest_opponent_rating": 2890,
						...
					},
				},
				...
			],
			...
		}
	*/
})
```