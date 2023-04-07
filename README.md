
  

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

  

- [ ] Fix unable to view some live games issue

  

  

## Simple usage:

  

```js
const { Standard } = require("chess.com");

Standard.Search("Hikaru").then(async  users  =>{
	let  hikaru = users[0];

	let  profile = await  Standard.User(hikaru.username);
	console.log(profile);

	let  stats = await  Standard.Stats(hikaru.username);
	console.log(stats);
})
```

  

  

# Documentation:

  

  

## Standard:

  

<a  name="decode-moves"></a>

  

### DecodeMoves(moveList)

  

#### <ins>**Params**</ins>:

  

moveList - string (The string provided by [Standard.Game()](#gamegameid-type)

  

#### <ins>**Description:**</ins>

  

Decodes the moveList provided by [Standard.Game()](#gamegameid-type)

  

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/DecodeMoves.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Standard } = require("chess.com");

Standard.Games('some-user').then(async  games  => {
	let  chosenGame = games[0];
	
	let  game = await  Standard.Game(chosenGame.id);
	
	let  moves = Standard.DecodeMoves(game.game.moveList);
	console.log(moves);
})
```

  

---

<a  name="game"></a>

  

### Game(gameId, type)

#### <ins>**Params**</ins>:

  

gameId - string/int (The ID provided by [Standard.Games()](#gamesusername-live))

  

type - string (Can be one of [Standard.GAMES](#constants))

  

#### <ins>**Description:**</ins>

  

Gets information on a game from [Standard.Games()](#gamesusername-live)

  

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Game.json)

  
  

#### <ins> **Usage:** </ins>

  

```js
const { Standard } = require("chess.com");

Standard.Games('some-user').then(async  games  => {
	let  chosenGame = games[0];

	let  game = await  Standard.Game(chosenGame.id);
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

  

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Games.json)

  

[See Returns - Live Games](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Games_Live.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Standard } = require("chess.com");

Standard.Games('some-user').then(games  => {
	console.log(games);
})

Standard.Games('some-user', true).then(liveGames  => {
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

  

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Search.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Standard } = require("chess.com");

Standard.Search('some-username').then(users  => {
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

  

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/Stats.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Standard } = require("chess.com");

Standard.Stats('some-username').then(stats  => {
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

  

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Standard/User.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Standard } = require("chess.com");

Standard.User('some-username').then(user  => {
	console.log(user);
})
```

  

## Variants:

### An introduction.

  

Variants are different to the Standard section of this package. This is for two reasons:

1. They are completely different types of chess

2. There are technical differences between accessing each type of data

  

Rest assured, accessing variants data can be done.

However, it requires user authentication (email + password + username).

This is due to the fact that chess.com Variants make use of web sockets to load data, whereas the Standard versions make use of simple HTTP Get requests.

  

It is relatively simple to get variants working, I just would like to point out why the package requires your chess.com email, username and password.

In fact, I recommend you to go through the package and check that your information is not stored or transferred in any way before providing it with any personal information.

The only time your data is used is [here](https://github.com/ProfessorFish/Chess.com/blob/main/src/Classes/Variants/Functions/GetSessionID.js), to log on and get your PHPSESSID cookie.

  

### Initialisation:

Here is some boilerplate code for initialising the variant side of the package:

```js
const { Variants } = require("chess.com");

(async () =>{
	//Initialise the variant manager
	let  VariantManager = new  Variants()

	await  VariantManager.Init();
})()
```

  

There are two ways to provide the package with your email, username and password:

1. (Recommended) Make use of environment variables and set them as EMAIL, USERNAME and PASSWORD respectively.

2. Pass them to the VariantManager constructor directly:

```js
const { Variants } = require("chess.com");

(async () =>{
//Initialise the variant manager
let  VariantManager = new  Variants('some_email', 'some_password', 'some_username')

await  VariantManager.Init();
})()
```

  

This may take some time to perform as it uses puppeteer, although it will only need to be performed once, or every few hours depending on how often the variant manager is used (It is all handled internally, so do not worry about re-initialising your Variant manager).

  

### Stats(username)

*Not to be confused with [Standard.Stats()](#stats)*

#### <ins>**Params**</ins>:

username - string (The Chess.com username)

#### <ins>**Description:**</ins>

Gets the specified user's variant stats.

  

[See Returns](https://github.com/ProfessorFish/Chess.com/blob/main/examples/Returns/Variants/Stats.json)

  

#### <ins> **Usage:** </ins>

  

```js
const { Variants } = require("chess.com");

  

(async () =>{
//Initialise the variant manager
let  VariantManager = new  Variants('some_email', 'some_password', 'some_username')//Or use environment variables

await  VariantManager.Init();

let  stats = await  VariantManager.Stats('Hikaru')
console.log(stats);
})()
```

  
  
  

## Constants

**Standard.GAMES:**

- LIVE - A live game

- COMPUTER - A computer game

- BOT - Alias for computer

- DAILY - A daily game

  

# Credits

Coded by [ProfessorFish](https://discord.gg/u9gFdnu)

  

If you find any bugs or issues or just need help, then click on the link above and join the Discord server where you will be able to ask me for help.