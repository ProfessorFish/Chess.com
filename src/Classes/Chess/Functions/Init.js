const WebSocketClient = require('websocket').client;

module.exports = function Init() {
  if(!this.EMAIL || !this.PASSWORD || !this.USERNAME)throw Error('You must either provide the email, password and username to the Variant class initialiser, or as environment variables called EMAIL, PASSWORD and USERNAME!')
  return new Promise(async (resolve, reject) => {
    this.client = new WebSocketClient();
    let client = this.client;
    let tis = this;
    this.php = await this.GetSessionID()

    let userID = (await this.User(this.USERNAME)).userId;

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
      
      connection.sendUTF(
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