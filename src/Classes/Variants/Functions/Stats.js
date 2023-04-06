const Standard = require("../../Standard/main.js");

module.exports = async function GetStats(username) {
  if (!this.connection || !this.client) await this.StartClient();
  
  return new Promise(async (resolve, reject) => {
    let user = (await Standard.Search(username))[0];
    
    let connection = this.connection;
    let done = false;

    if (!user) return reject('User does not exist');

    connection.on('message', Callback);
    
    connection.sendUTF(JSON.stringify({
      "action": "player-popup",
      "data": {
        "playerId": user.id,
        "username": user.username
      }
    }))
    
    function Callback(data) {
      let json = JSON.parse(data.utf8Data)
      if (json.mutation === 'user_popup' && json.data.username === user.username) {
        done = true;

        resolve(json.data);
        return connection.removeListener('message', Callback);
      } else if(json.mutation === "popup_user_not_found" && json.data.username === user.username){
        done = true;

        resolve({ message: "User has not played a variant game."});
        return connection.removeListener('message', Callback);
      }
    }

    setTimeout(() =>{
      if(!done){
        resolve({ message: "User does not exist." });
        return connection.removeListener('message', Callback);
      }
    }, 5_000);
  })

}