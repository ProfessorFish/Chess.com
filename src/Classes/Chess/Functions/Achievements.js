const scrapefrom = require("scrapefrom");
const fetch = require("node-fetch");

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
            { selector: ".awards-page-list-item button:not([data-is-hidden])", name: "image", attribute: "data-src" }
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
    }]);

    if (!res[1].result.description) null;
    else if (typeof res[1].result.description !== "string") {
        for (let i = 0; i < res[1].result.description.length; i++) {
            res[1].result.description[i] = res[1].result.description[i].replace(/\[*\]\([^)]*\)!/g, "").replace("[", "");
        }
    } else res[1].result.description = res[1].result.description.replace(/\[*\]\([^)]*\)!/g, "").replace("[", "");
    let out = {};

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

                    if ((re.url.includes("trophies") || re.url.includes("games")) && sub === "id") {
                        let id = re.result[sub][i];
                        let arena = re.result["arena"][i];

                        data.items = await (await fetch("https://www.chess.com/callback/user/trophy/" + username + "/" + id + "/" + arena)).json();
                    }

                    data[sub] = re.result[sub][i];
                }
                mapped.push(data);
            }
        }


        out[url.url.split("/").at(-1)] = mapped;
    }

    return out;
}