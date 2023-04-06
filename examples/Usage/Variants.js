const { Variants } = require("../../index.js");
require("dotenv").config();

(async () =>{
    //Initialise the variant manager
    let VariantManager = new Variants()
    await VariantManager.Init();

    //Get the variant stats
    let variantStats = await VariantManager.Stats('kycoops');
    console.log(variantStats);
})()