var express = require("express");
var router = express.Router();

const parser = require("./isasLib");

const base = require("./views/base");
const index = require("./views/index");

router.get("/", (req, res) => {
    const announcement = `<div>
    <h6>Funkce</h6>
    <ul>
        <li>
            <b>Vážené průměry</b>
        </li>
        <li>Trvalé přihlášení</li>
        <li>Zvýraznění nových známek</li>
        <li>Vše ze starého iSASu</li>
    </ul>
</div>`;

    /* If user auth is bad, don't redirect to stats */
    if (req.query.badlogin) {
        const alert = `<div class="col">
        <div class="alert alert-danger" role="alert">
            Špatné uživatelské jméno nebo heslo.
        </div>
    </div>`;
        res.send(
            base(
                index(alert, announcement)
            )
        );
        return;
    }

    /* If user is already logged in, redirect directly to stats */
    if (req.cookies["auth"]) {
        res.redirect("/stats");
        return;
    }

    res.send(
        base(
            index(announcement)
        )
    );
});

function filterOutLetters(marks) {
    /* Filter out letters (A, N) */
    return marks.filter((znamka) => !isNaN(znamka.znamka)).map((z) => {
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

router.post("/stats", async (req, res) => {
    const REMEMBER_AUTH_PERIOD = 7 * 24 * 60 * 60 * 1000;
    const cookieString = Buffer.from(JSON.stringify([req.body.username, req.body.password])).toString("base64");
    res.cookie("auth", cookieString, { maxAge: REMEMBER_AUTH_PERIOD });
    res.redirect("/stats");
});

router.get("/stats", async (req, res) => {
    try {
        /* Read auth cookie */
        const authCookie = req.cookies["auth"];

        /* If not logged in, redirect to login page */
        if (!authCookie) {
            res.redirect("/");
            return;
        }

        const authBuffer = Buffer.from(authCookie, "base64").toString("ascii");

        /* Parse auth cookie into an auth tuple */
        const auth = JSON.parse(authBuffer);

        /* Get znamky */
        // @ts-ignore
        const znamky = await parser(...auth);

        /* If no znamky, login details are incorrect */
        if (!znamky.length) {
            res.redirect("/?badlogin=true");
            return;
        }

        /* Calculate weighted averages */
        const vazenePrumery = prumery(znamky)
            .map((vazenyPrumer) => {
                return { ...vazenyPrumer, vyslednaZnamka: Math.round(vazenyPrumer.vazenyPrumer) };
            })
            .sort((a, b) => a.vazenyPrumer - b.vazenyPrumer);

        /* Represent a prumer with color ranging from white for 1 to red for 5 */
        const prumerToRgb = (prumer) => {
            return interpolate(["white", "red"])((prumer - 1) / 4);
        };

        /* Generate HTML for prumery */
        const prumeryRows = vazenePrumery
            .map((prumer) => `<tr>
    <td>${prumer.predmet}</td>
    <td class="td-color" style="background-image: linear-gradient(to left, ${prumerToRgb(prumer.vazenyPrumer)} 0%, ${prumerToRgb(prumer.vazenyPrumer)} 100%);">${prumer.vazenyPrumer}</td>
    <td class="td-color" style="background-image: linear-gradient(to left, ${prumerToRgb(prumer.vyslednaZnamka)} 0%, ${prumerToRgb(prumer.vyslednaZnamka)} 100%);">${prumer.vyslednaZnamka}</td>
</tr>`)
            .join("");

        /* New marks logic */
        const lastMark = req.cookies["lastMark"];
        let lastIndex;
        /* No marks cookie, create one */
        if (!lastMark) {
            res.cookie("lastMark", znamky[0], { maxAge: 900000000 });
            lastIndex = znamky.length - 1;
        } else {
            lastIndex = znamky.findIndex((znamka) => {
                return JSON.stringify(znamka) === JSON.stringify(lastMark);
            });
            res.cookie("lastMark", znamky[0], { maxAge: 900000000 });
        }

        const isNewMark = (znamka) => {
            return znamky.indexOf(znamka) < lastIndex;
        };

        /* Generate HTML for znamky */
        const znamkyRows = znamky
            .map((znamka) => `<tr>
    <td>${znamka.datum}</td>
    <td>${znamka.predmet}</td>
    <td>${znamka.znamka}${isNewMark(znamka) ? "<span class=\"newMarkDot\"> &#127381;</span>" : ""}</td>
    <td>${znamka.vaha}</td>
    <td>${znamka.tema}</td>
</tr>`)
            .join("");

        /* Put it all together */
        const template = base(
            require("./views/stats")(znamkyRows, prumeryRows, {
                isVyznamenani: isVyznamenani(znamky)
            })
        );
        res.send(template);
    } catch (error) {
        throw error;
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

module.exports = router;