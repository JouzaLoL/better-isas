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

    <!-- js-cookie -->
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>

    <!-- Meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="iSAS with a fresh look and much-needed features">

    <title>Elektronická klasifikace</title>

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
    <meta property="og:title" content="EK">
    <meta property="og:url" content="https://isas.zlepsi.me">
    <meta property="og:image" content="https://isas.zlepsi.me/icons/og-image.jpg">
    <meta property="og:description" content="iSAS with a fresh look and much-needed features">
</head>

<body>
    ${content}

    <script>
        const html = \`<!-- Page loading indicator -->
    <div class="spinner">
        <div class="spinner-wrapper">
            <div class="rotator">
                <div class="inner-spin"></div>
                <div class="inner-spin"></div>
            </div>
        </div>
    </div>\`; 
        const element = document.createElement("div")
        element.classList.add("loadingWrapper");
        element.classList.add("animated");
        element.classList.add("fadeIn");
        window.onbeforeunload = () => {
            element.innerHTML = html;
            document.body.appendChild(element);
        };
    </script>
    <div class="container shadow-sm pb-2">
    <div class="row footer">
        <div class="col font-weight-light text-center">
        &copy;  <a href="mailto:vacekj@outlook.com">Josef Vacek</a><br>
        Tato aplikace není oficiální aplikací iSAS.
         Používáním této aplikace souhlasíte s poskytnutím svých přihlašovacích údajů serverům EK a jejich dočasným uložením do souboru cookie za účelem poskytování této aplikace.
        </div>
    </div>
    </div>
</body>

</html>`;
