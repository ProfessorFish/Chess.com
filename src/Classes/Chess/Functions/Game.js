const fetch = require("node-fetch");


module.exports = async function GetGame(id, live, daily, computer) {

  let serverNumber = 0;

  try {
    if (live) {
      let res = {};
      let game = {};

      while (!res.ok && serverNumber <= 50) {
        res = await fetch("https://www.chess.com/service/play-" + serverNumber + "/chess/games/" + id)
        serverNumber++;
      }

      if (res.ok)return await res.json();
      else throw Error('Failed to access live game');
    } else {
      let url = "https://www.chess.com/"
      if(computer){
        url += "computer/callback/game/" + id
      } else{
        url += "callback/"
        if(daily) url += "daily/"
        else url += "live/"
        url += "game/" + id
      }
      
      let res = await fetch(url);

      let json = await res.json();

      return json;
    }
  } catch (err) {
    throw Error(err);
  }
}