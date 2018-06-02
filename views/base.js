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

    <!-- Meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="iSAS with a fresh look and much-needed features">

    <title>${require("./common").randomTitle()}</title>

    <!-- Stylesheets -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
        crossorigin="anonymous">
    <link rel="stylesheet" href="/custom.css">
    
    <!-- Head interpolation -->
    ${head}
    
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png?v=WGLpp0AGmP">
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png?v=WGLpp0AGmP">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png?v=WGLpp0AGmP">
    <link rel="manifest" href="/icons/site.webmanifest?v=WGLpp0AGmP">
    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg?v=WGLpp0AGmP" color="#385088">
    <link rel="shortcut icon" href="/icons/favicon.ico?v=WGLpp0AGmP">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-config" content="/icons/browserconfig.xml?v=WGLpp0AGmP">
    <meta name="theme-color" content="#385088">
    
    <!-- Facebook OpenGraph -->
    <meta property="og:image:width" content="279">
    <meta property="og:image:height" content="279">
    <meta property="og:title" content="Better iSAS">
    <meta property="og:url" content="http://betterisas.openode.io">
    <meta property="og:image" content="http://betterisas.openode.io/icons/og-image.jpg">
    <meta property="og:description" content="iSAS with a fresh look and much-needed features">
</head>

<body>
    ${content}
</body>

</html>`;
