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
[decode](#Standard)
## TODO:
### Additions:

 - [ ] Add fetching leader-boards
 - [ ]  Add get user's friends
 - [ ]  Add support for clubs
 - [ ]  Add support for leagues

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
#### <ins>Params</ins>:
**moveList** - string

