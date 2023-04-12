const fetch = require("lets-fetch");
module.exports = async function Friends(username, pages=Infinity, avatarSize=64) {
    if(!this.EMAIL || !this.PASSWORD || !this.USERNAME)throw Error('You must either provide the email, password and username to the Variant class initialiser, or as environment variables called EMAIL, PASSWORD and USERNAME!')
    if (!this.connection || !this.client || !this.php) await this.Init();
    try {
        let userId = (await this.User(username)).userId;

        let res = await fetch.single("https://www.chess.com/callback/friends/" + userId + "/search?avatarSize=" + avatarSize + "&page=1", {
            headers: {
                cookie: "PHPSESSID=" + this.php
            }
        });

        let base = res;

        let page = 2;

        let urls = [];
        while(page < Math.min(pages, Math.ceil(base.friendsCount / base.friendsPerPage)) + 1){
            urls.push("https://www.chess.com/callback/friends/" + userId + "/search?avatarSize=" + avatarSize + "&page=" + page);
            page++;
        }

        let returns = await fetch.many(urls, {headers: {
            cookie: "PHPSESSID=" + this.php
        }});

        let friends = returns.map(k=> k.friends).reduce((p, c) => p.concat(c), [])

        base.friends = base.friends.concat(friends)

        return base;

    } catch (err) {
        throw Error(err);
    }
}