const fetch = require("node-fetch");

module.exports = async function Search(username){
  try{
    let res = await fetch("https://www.chess.com/callback/user/search/chess?query=" + username);
    
    return await res.json();
  } catch(err){
    throw Error(err);
  }
}