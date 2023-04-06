const WebSocketClient = require('websocket').client;
const Standard = require("../../Standard/main.js");

module.exports = function Init() {
  return new Promise(async (resolve, reject) => {
    this.client = new WebSocketClient();
    let client = this.client;
    let tis = this;

    let userID = (await Standard.User(process.env.username)).userId;

    client.connect("wss://variants.gcp-prod.chess.com/")
    client.on('connectFailed', function(error) {
      tis.connection = null;
      tis.client = null;
      reject(error);
    });

    client.on('connect', async function(connection) {
      
      tis.connection = connection;
      connection.on('error', function(error) {
        tis.client = null;
        tis.connection = null;
      });

      connection.on('close', function() {
        tis.client = null;
        tis.connection = null;
      });
      
      await connection.sendUTF(
        JSON.stringify({
          "action": "connect-user",
          "data": {
            "id": userID,
            "token": await tis.GetToken()
          }
        }))

      let inter = setInterval(() =>{
        if(!tis.connection)return clearInterval(inter);

        tis.connection.sendUTF(
          JSON.stringify({
            "action":"pong",
            "data":{
              "timestamp": Date.now(),
              "playerId":userID
            }})
        )
      }, 5_000)

      resolve(true);
    });
  })
}