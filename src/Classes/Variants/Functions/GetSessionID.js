const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

var userAgent = require('user-agents');


module.exports = async function GetSessionID() {
    
    const browser = await puppeteer.launch(
        {
            headless: true
        }
    );

    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString())

    await page.goto('https://www.chess.com/login');

    await page.type('#username', process.env.EMAIL);

    await page.type("#password", process.env.PASSWORD);

    await Promise.all([
        page.waitForNavigation(),
        page.click('#login')
      ]);
      
    let PHPSESSID = (await page.cookies()).find(k => k.name === "PHPSESSID").value;

    await browser.close();

    return PHPSESSID;
}