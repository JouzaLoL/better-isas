module.exports = (content = "", head = "") => `<!DOCTYPE html>
<html lang="cs">

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-111548982-2"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'UA-111548982-2');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${require("./common").randomTitle()}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
        crossorigin="anonymous">
        <link rel="stylesheet" href="/custom.css">
    <!-- Head interpolation -->
    ${head}
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f70a0a">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <!-- Facebook OpenGraph -->
    <meta property="og:image" content="/og-image.jpg">
    <meta property="og:image:width" content="128">
    <meta property="og:image:height" content="128">
    <meta property="og:title" content="Better iSAS">
    <meta property="og:description" content="Like Zastupov&aacute;n&iacute;, but for iSAS">
    <meta property="og:url" content="http://betterisas.openode.io">
</head>

<body>
    ${content}
</body>

</html>`;
