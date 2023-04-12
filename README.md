
  

# Inner-chess

  

  

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

  

- [x] ~~Add get user's friends~~ DONE

  

- [ ] Add support for clubs

  

- [ ] Add support for leagues

  

- [ ] Add game fetching for variants

  

  

### Bug fixes:

  

- [ ] Fix unable to view some live games issue

  

  

## Simple usage:

  

```js
const { Chess } = require("inner-chess");

let chess = new Chess();

chess.Search("some-user").then(async  users  =>{
	let user = users[0];

	let profile = await  chess.User(user.username);
	console.log(profile);

	let stats = await  chess.Stats(user.username);
	console.log(stats);
})
```

  

  

# Documentation:

  

  

## Uncredentialed endpoints:

  

<a  name="decode-moves"></a>

  

### DecodeMoves(moveList)

  

#### <ins>**Params**</ins>:

  

moveList - string (The string provided by [chess.Game()](#gamegameid-type))

  

#### <ins>**Description:**</ins>

  

Decodes the moveList provided by [chess.Game()](#gamegameid-type)

  

[See Returns](https://github.com/ProfessorFish/Chess.com/tree/main/examples/Returns/Chess/DecodeMoves.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Chess } = require("inner-chess");

let chess = new Chess();

chess.Games('some-user').then(async  games  => {
	let  chosenGame = games[0];
	
	let  game = await  chess.Game(chosenGame.id);
	
	let  moves = chess.DecodeMoves(game.game.moveList);
	console.log(moves);
})
```

  

---

<a  name="game"></a>

  

### Game(gameId, type)

#### <ins>**Params**</ins>:

  

gameId - string/int (The ID provided by [chess.Games()](#gamesusername-live))

  

type - string (Can be one of [Chess.GAMES](#constants))

  

#### <ins>**Description:**</ins>

  

Gets information on a game from [chess.Games()](#gamesusername-live)

  

[See Returns](https://github.com/ProfessorFish/Chess.com/tree/main/examples/Returns/Chess/Game.json)

  
  

#### <ins> **Usage:** </ins>

  

```js
const { Chess } = require("inner-chess");

let chess = new Chess();

chess.Games('some-user').then(async  games  => {
	let  chosenGame = games[0];

	let  game = await  chess.Game(chosenGame.id);
	console.log(game);
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

  

[See Returns](https://github.com/ProfessorFish/Chess.com/tree/main/examples/Returns/Chess/Games.json)

  

[See Returns - Live Games](https://github.com/ProfessorFish/Chess.com/tree/main/examples/Returns/Chess/Games_Live.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Chess } = require("inner-chess");

let chess = new Chess();

chess.Games('some-user').then(games  => {
	console.log(games);
})

chess.Games('some-user', true).then(liveGames  => {
	console.log(liveGames);
})

```

  

---

<a  name="search"></a>

  

### Search(username, live)

#### <ins>**Params**</ins>:

username - string (The Chess.com username)

#### <ins>**Description:**</ins>

Gets a list of users that match the username query.

  

[See Returns](https://github.com/ProfessorFish/Chess.com/tree/main/examples/Returns/Chess/Search.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Chess } = require("inner-chess");

let chess = new Chess();

chess.Search('some-username').then(users  => {
	console.log(users);
})
```

---

<a  name="stats"></a>

  

### Stats(username)

#### <ins>**Params**</ins>:

username - string (The Chess.com username)

#### <ins>**Description:**</ins>

Gets the specified user's standard chess statistics.

  

[See Returns](https://github.com/ProfessorFish/Chess.com/tree/main/examples/Returns/Chess/Stats.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Chess } = require("inner-chess");

let chess = new Chess();

chess.Stats('some-user').then(stats  => {
	console.log(stats);
})
```

  

---

<a  name="user"></a>

  

### User(username)

#### <ins>**Params**</ins>:

username - string (The Chess.com username)

#### <ins>**Description:**</ins>

Gets the specified user's profile information.

  

[See Returns](https://github.com/ProfessorFish/Chess.com/tree/main/examples/Returns/Chess/User.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Chess } = require("inner-chess");

let chess = new Chess();

chess.User('some-user').then(user  => {
	console.log(user);
})
```

  

## Credentialed Endpoints:

### An introduction.

  

Credentialed endpoints are different to the first section of this package. This is for two reasons:

1. They require credentials to access the data

2. There are technical differences between accessing each type of data


Rest assured, accessing credentialed data can be done.

However, it requires user authentication (email + password + username).

It is relatively simple to get credentialed endpoints working.

But before that, I recommend you to go through the package and check that your information is not stored or transferred in any way before providing it with any personal information.

The only time your data is used is [here](https://github.com/ProfessorFish/Chess.com/blob/main/src/Classes/Chess/Functions/GetSessionID.js), to log on and get your PHPSESSID cookie.

  

### Initialisation:

Here is some boilerplate code for initialising the variant side of the package:

```js
const { Chess } = require("inner-chess");

(async () => {
	//Initialise the variant manager
	let chess = new Chess()

	await chess.Init();
})()
```

  

There are two ways to provide the package with your email, username and password:

1. (Recommended) Make use of environment variables and set them as EMAIL, USERNAME and PASSWORD respectively. [See here](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Usage/.env)

2. Pass them to the Chess constructor directly:

```js
const { Chess } = require("inner-chess");

(async () =>{
	//Initialise the variant manager
	let chess = new Chess('some-email', 'some-password', 'some-username');

	await chess.Init();
})()
```

  

This may take some time to perform as it uses puppeteer, although it will only need to be performed once, or every few hours depending on how often the variant manager is used (It is all handled internally, so do not worry about re-initialising your Variant manager).

*Optionally you do not have to run chess.Init() as if a credentialed function is ran, it will automatically initialise it. However this adds time to the function call, so it is recommended that you initialise before the package is used.*

  

### VariantStats(username)

*Not to be confused with [chess.Stats()](#stats)*

#### <ins>**Params**</ins>:

username - string (The Chess.com username)

#### <ins>**Description:**</ins>

Gets the specified user's variant stats.

  

[See Returns](https://github.com/ProfessorFish/Chess.com/tree/main/examples/Returns/Chess/VariantStats.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Chess } = require("inner-chess");

(async () => {
	//Initialise the variant manager
	let chess = new Chess('some-email', 'some-password', 'some-user')//Or use environment variables

	await chess.Init();

	let stats = await chess.VariantStats('some-user')
	console.log(stats);
})()
```

### Friends(username)

#### <ins>**Params**</ins>:

username - string (The Chess.com username)

pages - integer (Number of pages of friends to get, defaults to Infinity)

avatarSize - integer (Size of returned friends' avatars, defaults to 64)

#### <ins>**Description:**</ins>

Gets the specified user's friends.


[See Returns](https://github.com/ProfessorFish/Chess.com/tree/main/examples/Returns/Chess/Friends.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Chess } = require("inner-chess");

(async () => {
	//Initialise the variant manager
	let chess = new Chess('some-email', 'some-password', 'some-user')//Or use environment variables

	await chess.Init();

	let friends = await chess.Friends('some-user')
	console.log(friends);
})()
```
  
  

## Constants

**Chess.GAMES:**

- LIVE - A live game

- COMPUTER - A computer game

- BOT - Alias for computer

- DAILY - A daily game

  

# Credits

Coded by [ProfessorFish](https://discord.gg/u9gFdnu)

  

If you find any bugs or issues or just need help, then click on the link above and join the Discord server where you will be able to ask me for help.