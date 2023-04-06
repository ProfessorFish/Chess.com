const fetch = require("node-fetch");

module.exports = async function User(username){
  try{
    let res = await fetch("https://www.chess.com/callback/user/popup/" + username);

    return await res.json();
  } catch(err){
    throw Error(err);
  }
}