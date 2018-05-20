const express = require('express');
const app = express();
const parser = require("./lib");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded());

function vazenyPrumer(znamky) {
    const soucetVah = znamky.map((znamka) => znamka.vaha).reduce((acc, vaha) => {
        acc + vaha;
    }, 0);

    const soucetVazenychZnamek = znamky.reduce((acc, znamka) => {
        return acc + (znamka.znamka * znamka.vaha);
    }, 0);

    return soucetVazenychZnamek / soucetVah;
}

app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="cs">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>BetterISAS</title>
    </head>
    
    <body>
        <form action="/stats" method="post">
            <input type="text" name="username" id="usr">
            <input type="password" name="password" id="pwd">
            <input type="submit" value="Přihlásit">
        </form>
    </body>
    
    </html>`);
});

app.post('/stats', async (req, res) => {
    const znamky = await parser(req.body.username, req.body.password);
});

app.listen(80, () => console.log("BetterISAS listening on port 80"));