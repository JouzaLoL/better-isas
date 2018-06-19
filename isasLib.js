const requestProm = require("request-promise-native");
const cheerio = require("cheerio");

const decodeWin1250 = require("./decode");

/* Request instance */
const request = requestProm.defaults({
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
    try {
        /* Create a cookie jar on every session to prevent cookie leaks */
        const cookieJar = requestProm.jar();

        /* Log into iSAS to obtain session cookie */
        await request("/prihlasit.php", {
            method: "post",
            jar: cookieJar,
            formData: {
                "login-isas-username": username,
                "login-isas-password": password,
                "login-isas-send": "isas-send"
            }
        });

        const resBuffer = await request("/prubezna-klasifikace.php", {
            jar: cookieJar,
            encoding: null
        });

        return parsePrubeznaKlasifikace(decodeWin1250(resBuffer));
    } catch (error) {
        throw error;
    }
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
            znamka: markTr.children[2].firstChild.data === "NH" ? "1" : markTr.children[2].firstChild.data,
            vaha: parseInt(markTr.children[3].firstChild.data.slice(1)),
            tema: markTr.children[4].firstChild ? markTr.children[4].firstChild.data : "",
            ucitel: markTr.children[5].firstChild.data
        };
    }

    return markTrs
        .map(parseTr);
}

module.exports = getZnamky;