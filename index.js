const fs = require("fs");
const https = require("https");
const http = require("http");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const Raven = require("raven");
const helmet = require("helmet");

/* Helmet Security */
app.use(helmet());

// Sentry.io error handling
Raven.config("https://ff58bf1bb33348ddb0c5b56bbdd932f2@sentry.io/1214091").install();
app.use(Raven.requestHandler());

// @ts-ignore
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));

/* Static assets */
app.use(express.static("./public"));

/* Router */
app.use("/", require("./routes"));

/* Error handlers */
app.use(Raven.errorHandler());
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

/* HTTPS Options */
const options = {
    key: fs.readFileSync("./sslcert/domain-key.pem"),
    cert: fs.readFileSync("./sslcert/domain-crt.pem")
};

const serverStarted = () => {
    console.log("> Better iSAS started succesfully");
};

/* Start the server */
http.createServer(app).listen(80, serverStarted);
https.createServer(options, app).listen(443, serverStarted);
