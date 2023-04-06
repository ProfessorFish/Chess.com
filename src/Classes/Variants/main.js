module.exports = class VariantManager{
    constructor(email, password){
      this.EMAIL = email || process.env.EMAIL
      this.PASSWORD = password || process.env.PASSWORD;
  
      if(!this.EMAIL || !this.PASSWORD)throw Error('You must either provide the email and password to the Variant class initialiser, or as environment variables called EMAIL and PASSWORD!')
    }
  
    async Init(){
      return await require("./Functions/Init.js").apply(this, [])
    }

    async Stats(username){
      return await require("./Functions/Stats.js").apply(this, [username]);
    }
  
    //All used in initialisation (Don't need to call them on their own ever)
    async GetToken(){
      return await require("./Functions/GetToken.js").apply(this, []);
    }
  
    async GetSessionID(){
      return await require("./Functions/GetSessionID.js").apply(this, []);
    }
  }