const scrapefrom = require("scrapefrom");
const fetch = require("node-fetch");
const domany = require("domany");

module.exports = async function Achievements(username) {
    let res = await scrapefrom([{
        url: "https://www.chess.com/awards/" + username + "/passport",
        defaultDelimiter: null,
        extracts: [
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "name", attribute: "data-name" },
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "description", attribute: "data-description" },
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "image", attribute: "data-src" }
        ]
    }, {
        url: "https://www.chess.com/awards/" + username + "/books",
        defaultDelimiter: null,
        extracts: [
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "name", attribute: "data-name" },
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "description", attribute: "data-description" },
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "date", attribute: "data-date" },
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "image", attribute: "data-src" }
        ]
    }, {
        url: "https://www.chess.com/awards/" + username + "/achievements",
        defaultDelimiter: null,
        extracts: [
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "name", attribute: "data-name" },
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "description", attribute: "data-description" },
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "date", attribute: "data-date" },
            { selector: ".awards-p4age-list-item button:not([data-is-hidden])", name: "image", attribute: "data-src" }
        ]
    }, {
        url: "https://www.chess.com/awards/" + username + "/trophies",
        defaultDelimiter: null,
        extracts: [
            { selector: ".awards-page-list-item div img", name: "name", attribute: "alt" },
            { selector: ".awards-page-list-item div img", name: "image", attribute: "data-src" },
            { selector: ".awards-page-list-item button", name: "id", attribute: "data-id" },
            { selector: ".awards-page-list-item button", name: "arena", attribute: "data-is-arena" }
        ]
    }, {
        url: "https://www.chess.com/awards/" + username + "/games",
        defaultDelimiter: null,
        extracts: [
            { selector: ".awards-page-list-item div img", name: "name", attribute: "alt" },
            { selector: ".awards-page-list-item div img", name: "image", attribute: "data-src" },
            { selector: ".awards-page-list-item button", name: "id", attribute: "data-id" },
            { selector: ".awards-page-list-item button", name: "arena", attribute: "data-is-arena" }
        ]
    }, {
        url: "https://www.chess.com/awards/" + username + "/community",
        defaultDelimiter: null,
        extracts: [
            { selector: ".awards-page-list-item div img", name: "name", attribute: "alt" },
            { selector: ".awards-page-list-item div img", name: "image", attribute: "data-src" },
            { selector: ".awards-page-list-item button", name: "id", attribute: "data-id" },
            { selector: ".awards-page-list-item button", name: "arena", attribute: "data-is-arena" }
        ]
    }]);

    if (!res[1].result.description) null;
    else if (typeof res[1].result.description !== "string") {
        for (let i = 0; i < res[1].result.description.length; i++) {
            res[1].result.description[i] = res[1].result.description[i].replace(/\[*\]\([^)]*\)!/g, "").replace("[", "");
        }
    } else res[1].result.description = res[1].result.description.replace(/\[*\]\([^)]*\)!/g, "").replace("[", "");


    let out = {};

    let toFetch = [];

    for (let url of res) {
        let mapped = [];

        let re = url;

        if (typeof re.result.name === "string") {
            mapped.push({
                name: re.result.name,
                description: re.result.description,
                image: re.result.image
            })
            if (re.result.date) mapped.at(-1).date = re.result.date;
        } else {
            for (let i = 0; i < re.result[Object.keys(re.result)[0]].length; i++) {
                let data = {};

                for (let j = 0; j < Object.keys(re.result).length; j++) {
                    let sub = Object.keys(re.result)[j];

                    if (sub === "arena") continue;

                    if ((re.url.includes("trophies") || re.url.includes("games") || re.url.includes("community")) && sub === "id") {
                        let id = re.result[sub][i];
                        let arena = re.result["arena"][i];

                        toFetch.push({ key: re.url.split("/").at(-1), url: "https://www.chess.com/callback/user/trophy/" + username + "/" + id + "/" + arena })
                    }

                    data[sub] = re.result[sub][i];
                }
                mapped.push(data);
            }
        }


        out[url.url.split("/").at(-1)] = mapped;
    }

    
    let result = await domany(toFetch, async k => {
        return {
            key: k.key,
            url: k.url,
            json: await (await fetch(k.url)).json()
        }
    }, { maxRetries: Infinity, amountPerUnit: toFetch.length / 50 });

    for (let res of result) {
        let key = res.key;
        let url = res.url;
        let json = res.json;

        let ind = out[key].findIndex(k => k.id === url.split("/").at(-2));

        out[key][ind].items = json
    }

    return out;
}