const fetch = require("node-fetch");

module.exports = async function Stats(username){
  try{
    let res = await fetch('https://www.chess.com/callback/member/stats/' + username);

    return await res.json();
  } catch(err){
    throw Error(err);
  }
}