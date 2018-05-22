const express = require('express');
const app = express();
const parser = require("./lib");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded());


app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="cs">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>BetterISAS</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
            crossorigin="anonymous">
    </head>
    
    <body>
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <h1>Better ISAS</h1>
                    <form action="/stats" method="post">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Přihlašovací jméno" name="username" id="usr">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Heslo" name="password" id="pwd">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Přihlásit</button>
                        </div>
    
                    </form>
                </div>
            </div>
        </div>
    </body>
    
    </html>`);
});

function vazenyPrumer(znamky) {
    const soucetVah = znamky.map((znamka) => znamka.vaha).reduce((acc, vaha) => {
        acc + vaha;
    }, 0);

    const soucetVazenychZnamek = znamky.reduce((acc, znamka) => {
        return acc + (znamka.znamka * znamka.vaha);
    }, 0);

    return soucetVazenychZnamek / soucetVah;
}

function prumery(znamky) {
    const predmety = Array.from(new Set(znamky.map((znamka) => znamka.predmet)));
    const prumery = predmety.map((predmet) => {
        const vazenySoucet = znamky.filter((znamka) => znamka.predmet === predmet).reduce((soucet, curr) => {
            return soucet + curr.znamka * curr.vaha;
        }, 0);
        const soucetVah = znamky.filter((znamka) => znamka.predmet === predmet).reduce((soucet, curr) => {
            return soucet + curr.vaha;
        }, 0);
        const vazenyPrumer = vazenySoucet / soucetVah;
        return {
            vazenyPrumer: Number(vazenyPrumer.toFixed(2)),
            predmet
        };
    });
    return prumery;
}

const interpolate = require('color-interpolate');
const invert = require('invert-color');

app.post('/stats', async (req, res) => {
    const znamky = await parser(req.body.username, req.body.password);
    const vazenePrumery = prumery(znamky).map((vazenyPrumer) => {
        return { ...vazenyPrumer, vyslednaZnamka: Math.round(vazenyPrumer.vazenyPrumer) }
    }).sort((a, b) => a.vazenyPrumer - b.vazenyPrumer);
    const prumerToRgb = (prumer) => {
        return interpolate(["white", "red"])((prumer - 1) / 4);
    };
    const prumeryRows = vazenePrumery
        .map((prumer) => `
    <tr>
    <td>${prumer.predmet}</td>
    <td style="border-right: solid 3px ${prumerToRgb(prumer.vazenyPrumer)}">${prumer.vazenyPrumer}</td>
    <td style="border-right: solid 3px ${prumerToRgb(prumer.vyslednaZnamka)}">${prumer.vyslednaZnamka}</td>
    </tr>`)
        .join("");

    const znamkyRows = znamky
        .map((znamka) => `
    <tr>
    <td>${znamka.datum}</td>
    <td>${znamka.predmet}</td>
    <td>${znamka.znamka}</td>
    <td>${znamka.vaha}</td>
    <td>${znamka.tema}</td>
    </tr>`)
        .join("");

    const template = `<!DOCTYPE html>
    <html lang="cs">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>BetterISAS</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
            crossorigin="anonymous">
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-1168224081669943",
                enable_page_level_ads: true
            });
        </script>
    </head>
    
    <body>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1>Better ISAS</h1>
                </div>
                <div class="col-sm-4">
                    <h2>Průměry</h2>
                    <table class="table table-sm table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Předmět</th>
                                <th scope="col">Vážený průměr</th>
                                <th scope="col">Výsledná známka</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${prumeryRows}
                        </tbody>
                    </table>
                </div>
                <div class="col-sm-8">
                    <h2>Známky</h2>
                    <table class="table table-sm table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Datum</th>
                                <th scope="col">Předmět</th>
                                <th scope="col">Známka</th>
                                <th scope="col">Váha</th>
                                <th scope="col">Téma</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${znamkyRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </body>
    
    </html>`;

    res.send(template);
});

app.listen(80, () => console.log("BetterISAS listening on port 80"));