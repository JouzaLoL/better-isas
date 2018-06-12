const requestProm = require("request-promise-native");
const cheerio = require("cheerio");

const decodeWin1250 = require("./decode");

/* Request instance */
const request = requestProm.defaults({
    baseUrl: "http://isas.gytool.cz/isas/"
});

async function logIn({ username, password }) {
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

        return cookieJar;
    } catch (error) {
        throw error;
    }
}

/**
 * Log into iSAS
 *
 * @returns
 */
async function getZnamky(cookieJar) {
    try {
        const resBuffer = await request("/prubezna-klasifikace.php", {
            jar: cookieJar,
            encoding: null
        });

        return parsePrubeznaKlasifikace(decodeWin1250(resBuffer));
    } catch (error) {
        throw error;
    }
}

async function getDetail(url, cookieJar) {
    try {
        const html = await request(url, {
            jar: cookieJar
        });
        return parseDetail(html);
    } catch (error) {
        throw error;
    }
}

function parseDetail(html) {
    const $ = cheerio.load(html);

    const table = $(".isas-histogram");
    return table;
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

    function parseMarkTr(markTr) {
        return {
            datum: markTr.firstChild.firstChild.firstChild.data,
            link: markTr.firstChild.firstChild.attribs.href,
            predmet: markTr.children[1].firstChild.data,
            znamka: markTr.children[2].firstChild.data,
            vaha: parseInt(markTr.children[3].firstChild.data.slice(1)),
            tema: markTr.children[4].firstChild ? markTr.children[4].firstChild.data : "",
            ucitel: markTr.children[5].firstChild.data
        };
    }

    return markTrs
        .map(parseMarkTr);
}

/**
 *    Filter out letters (A, N)
 *
 * @param {*} marks
 * @returns
 */
function filterOutLetters(marks) {
    return marks
        .filter((znamka) => !isNaN(znamka.znamka))
        .map((z) => {
            return Object.assign(z, { znamka: parseInt(z.znamka) });
        });
}

function prumery(z) {
    const znamky = filterOutLetters(z);
    const predmety = Array.from(new Set(znamky.map((znamka) => znamka.predmet)));
    const result = predmety.map((predmet) => {
        const znamkyZPredmetu = znamky
            .filter((znamka) => znamka.predmet === predmet);
        const vazenySoucet = znamkyZPredmetu
            .reduce((soucet, curr) => {
                return soucet + curr.znamka * curr.vaha;
            }, 0);

        const soucetVah = znamkyZPredmetu
            .reduce((soucet, curr) => {
                return soucet + curr.vaha;
            }, 0);

        const vazenyPrumer = vazenySoucet / soucetVah;
        return {
            vazenyPrumer: Number(vazenyPrumer.toFixed(2)),
            predmet
        };
    });

    return result;
}

function isVyznamenani(znamky) {
    const averages = prumery(znamky).map((vazenyPrumer) => {
        return { ...vazenyPrumer, vyslednaZnamka: Math.round(vazenyPrumer.vazenyPrumer) };
    }).sort((a, b) => a.vazenyPrumer - b.vazenyPrumer);
    const numberOf2s = averages.filter((avg) => avg.vyslednaZnamka === 2).length;
    const numberOf1s = averages.filter((avg) => avg.vyslednaZnamka === 2).length;
    return averages.every((avg) => avg.vyslednaZnamka <= 2) && numberOf1s > numberOf2s;
}

const interpolate = require("color-interpolate");

/* Represent a prumer with color ranging from white for 1 to red for 5 */
const prumerToRgb = (prumer) => {
    return interpolate(["white", "red"])((prumer - 1) / 4);
};

module.exports = { getZnamky, prumerToRgb, isVyznamenani, prumery, getDetail, logIn };