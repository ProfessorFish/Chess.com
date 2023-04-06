const fetch = require("node-fetch");

const AbortController = require("abort-controller");
const UserInfo = require("./User");

module.exports = function GetLiveGames(username, live){

  if(live){
    const controller = new AbortController();
  
    return new Promise(async function(resolve, reject) {
  
      try{
        let { uuid } = await UserInfo(username);
        
        let res = await fetch("https://www.chess.com/service/presence/watch/users?ids=" + uuid, {signal: controller.signal})
    
        res.body.on("data", async chunk =>{
          await controller.abort()
      
          let stringed = chunk.toString();
    
          let json = JSON.parse(stringed.split("data:")[1]);
    
          resolve(json)
          
      })
      
    } catch(err){
      reject(err)
    }
    })
  } else{
    
    return new Promise(async function(resolve, reject){
    try{
      let { userId } = await UserInfo(username);

      
      let res = await fetch("https://www.chess.com/callback/user/games?locale=en&all=1&userId=" + userId);

      let json = await res.json();

      resolve(json);
    } catch(err){
      reject(err)
    }
    })
  }
}