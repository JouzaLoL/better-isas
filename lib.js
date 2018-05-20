const requestProm = require("request-promise-native");
const decode = require("./decode");
const cheerio = require("cheerio");
const request = requestProm.defaults({
    jar: true,
    baseUrl: "http://isas.gytool.cz/isas/"
})

async function main(username, password) {
    await request("/prihlasit.php", {
        method: "post",
        jar: true,
        formData: {
            "login-isas-username": username,
            "login-isas-password": password,
            "login-isas-send": "isas-send"
        }
    });

    const resBuffer = await request("/prubezna-klasifikace.php", {
        method: "post",
        jar: true,
        encoding: null,
        formData: {
            "login-isas-username": "xvacek1",
            "login-isas-password": "Dhcepic10",
            "login-isas-send": "isas-send"
        }
    });
    return parse(decode(resBuffer));
}

function parse(html) {
    const $ = cheerio.load(html)
    const trs = $("#isas-obsah > table > tbody tr");
    const markTrs = trs.toArray().slice(1);

    function parseTr(markTr) {
        return {
            datum: markTr.firstChild.firstChild.firstChild.data,
            predmet: markTr.children[1].firstChild.data,
            znamka: parseInt(markTr.children[2].firstChild.data),
            vaha: parseInt(markTr.children[3].firstChild.data.slice(1)),
            tema: markTrs[0].children[4].firstChild.data,
            ucitel: markTrs[0].children[5].firstChild.data
        };
    }
    return markTrs.map(parseTr).filter((znamka) => !isNaN(znamka.znamka));
}

module.exports = main;