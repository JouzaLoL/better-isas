module.exports = (alert = "", announcement = "") => `<div class="container shadow-sm">
    <div class="row shadow-sm mb-3" style="color: #33528B">
        <div class="col pl-2" style="border-top: solid;">
            <h1 class="mb-0 p-1 font-weight-bold text-center">Elektronická klasifikace</h1>
        </div>
    </div>
    <div class="row">
        ${alert}
    </div>
    <div class="row">
        <div class="col-6">
            <form action="/stats" method="post">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Přihlašovací jméno" name="username" id="usr">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Heslo" name="password" id="pwd">
                </div>
                <div class="form-group">
                    <button type="submit" class="shade btn btn-block" style="background: #33528B; color: white;">Přihlásit</button>
                </div>
            </form>
        </div>
        <div class="col-6 p-0">
            ${announcement}
        </div>
    </div>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-6t+ed+2i-1n-4w"
        data-ad-client="ca-pub-1168224081669943" data-ad-slot="5029128614"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>`;
