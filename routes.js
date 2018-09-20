var express = require("express");
var router = express.Router();

const isas = require("./isasLib");

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
        res.clearCookie("auth");
        res.send(
            base(
                index(alert, announcement)
            )
        );
        return;
    }

    /* If user auth has no marks, don't redirect to stats */
    if (req.query.nomarks) {
        const alert = `<div class="col">
        <div class="alert alert-info" role="alert">
            Žádné známky k zobrazení.
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
            index("", announcement)
        )
    );
});

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

        /* Get isas session cookie & znamky */
        const cookieJar = await isas.logIn({ username: auth[0], password: auth[1] });
        const znamky = await isas.getZnamky(cookieJar);

        /* If znamky is null, no znamky yet */
        if (znamky === null) {
            res.redirect("/?nomarks=true");
        }

        /* If no znamky, login details are incorrect */
        if (!znamky.length) {
            res.redirect("/?badlogin=true");
            return;
        }

        /* Calculate weighted averages */
        const vazenePrumery = isas.prumery(znamky)
            .map((vazenyPrumer) => {
                return { ...vazenyPrumer, vyslednaZnamka: Math.round(vazenyPrumer.vazenyPrumer) };
            })
            .sort((a, b) => a.vazenyPrumer - b.vazenyPrumer);

        /* Generate HTML for prumery */
        const prumeryRows = vazenePrumery
            .map((prumer) => `<tr>
    <td>${prumer.predmet}</td>
    <td class="td-color" style="background-image: linear-gradient(to left, ${isas.prumerToRgb(prumer.vazenyPrumer)} 0%, ${isas.prumerToRgb(prumer.vazenyPrumer)} 100%);">${prumer.vazenyPrumer}</td>
    <td class="td-color" style="background-image: linear-gradient(to left, ${isas.prumerToRgb(prumer.vyslednaZnamka)} 0%, ${isas.prumerToRgb(prumer.vyslednaZnamka)} 100%);">${prumer.vyslednaZnamka}</td>
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
    <td>
        <a href="/detail/${znamka.detail}">${znamka.datum}</a>
    </td>
    <td>${znamka.predmet}</td>
    <td>${znamka.znamka}${isNewMark(znamka) ? `
        <span class="newMarkDot"> &#127381;</span>` : ""}</td>
    <td>${znamka.vaha}</td>
    <td>${znamka.tema}</td>
</tr>`)
            .join("");

        /* Put it all together */
        const template = base(
            require("./views/stats")(znamkyRows, prumeryRows, {
                isVyznamenani: isas.isVyznamenani(znamky)
            })
        );



        /* Send rendered HTML */
        res.send(template);
    } catch (error) {
        throw error;
    }
});

router.get("/detail/:id", async (req, res) => {
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

    /* Get isas session cookie & detail */
    const cookieJar = await isas.logIn({ username: auth[0], password: auth[1] });
    const detail = await isas.getDetail(req.params["id"], cookieJar);

    const template = require("./views/base")(
        require("./views/detail")(detail),
        ""
    );
    res.send(template);
});

router.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

/* Catch-all: redirect to index */
router.all("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;