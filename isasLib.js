const requestProm = require("request-promise-native");
const cheerio = require("cheerio");

const decodeWin1250 = require("./decode");

var cookieJar = requestProm.jar();
/* Request instance */
const request = requestProm.defaults({
    jar: cookieJar,
    baseUrl: "http://isas.gytool.cz/isas/"
});

/**
 * Log into iSAS and obtain znamky
 * 
 * @param {any} username 
 * @param {any} password 
 * @returns Znamky
 */
async function getZnamky(username, password) {
    /* Refresh the cookie jar, fixes cookie leaks */
    cookieJar = requestProm.jar();

    /* Log into iSAS to obtain session cookie */
    await request("/prihlasit.php", {
        method: "post",
        formData: {
            "login-isas-username": username,
            "login-isas-password": password,
            "login-isas-send": "isas-send"
        }
    });

    const resBuffer = await request("/prubezna-klasifikace.php", {
        encoding: null
    });

    return parsePrubeznaKlasifikace(decodeWin1250(resBuffer));
}

/**
 * Parse prubezna-klasifikace
 * 
 * @param {any} html prubezna-klasifikace html
 * @returns Znamky
 */
function parsePrubeznaKlasifikace(html) {
    const $ = cheerio.load(html);
    const trs = $("#isas-obsah > table > tbody tr");
    const markTrs = trs.toArray().slice(1);

    function parseTr(markTr) {
        return {
            datum: markTr.firstChild.firstChild.firstChild.data,
            predmet: markTr.children[1].firstChild.data,
            znamka: parseInt(markTr.children[2].firstChild.data),
            vaha: parseInt(markTr.children[3].firstChild.data.slice(1)),
            tema: markTr.children[4].firstChild.data,
            ucitel: markTr.children[5].firstChild.data
        };
    }

    return markTrs
        .map(parseTr)
        /* Filter out letters */
        .filter((znamka) => !isNaN(znamka.znamka));
}

module.exports = getZnamky;