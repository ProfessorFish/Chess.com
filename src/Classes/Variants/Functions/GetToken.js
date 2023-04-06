const fetch = require("node-fetch");

module.exports = async function GetToken() {
  try {
    let res = await fetch("https://www.chess.com/callback/auth/app/4pc", {
      headers: {
        cookie: "PHPSESSID=" + this.php
      }
    })

    let json = await res.json();

    if(!json.token){
      this.php = await this.GetSessionID();

      res = await fetch("https://www.chess.com/callback/auth/app/4pc", {
      headers: {
        cookie: "PHPSESSID=" + this.php
      }
    })

    json = await res.json()
    }
    
    return json.token;
  } catch (err) {
    throw Error('Could not get token')
  }
}