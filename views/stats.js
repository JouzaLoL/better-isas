
module.exports = (znamkyRows, prumeryRows, misc) => `<div class="container shadow-sm">
    <div class="row shadow-sm mb-3" style="color: #33528B">
        <div class="col pl-2" style="border-top: solid;">
            <h1 class="mb-0 p-1 font-weight-bold text-center float-left">EK</h1>
            <a href="/logout" class="float-right btn btn-light shade-sm" style="margin-top: 10px;">Odhlásit</a>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="card-title p-2" style="border-top: solid 3px #33528B">
                        <h5 class="m-0">Průměry</h5>
                    </div>
                    <div class="card-text">
                        <table class="table table-sm table-hover table-striped table-borderless">
                            <thead class="thead" style="
                            background: #33528B;
                            color: white;
                            ">
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
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="card-title p-2" style="border-top: solid 3px #33528B">
                        <h5 class="m-0">Ostatní</h5>
                    </div>
                    <div class="card-text">
                        <table class="table table-sm table-hover table-striped table-borderless">
                            <tbody>
                                <td>Vyznamenání: ${misc.vyznamenani ? "&#10004;" : "&#10060;"}</td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="card-title p-2" style="border-top: solid 3px #33528B">
                        <h5 class="m-0">Známky</h5>
                    </div>
                    <div class="card-text">
                        <table class="table table-responsive table-sm table-hover table-striped table-borderless">
                            <thead class="thead" style="
                                background: #33528B;
                                color: white;
                                ">
                                <tr>
                                    <th scope="col" id="datum">
                                        <button class="btn btn-outline-light btn-block active btn-sm focus">Datum</button>
                                    </th>
                                    <th scope="col" id="predmet">
                                        <button class="btn btn-outline-light btn-block active btn-sm">Předmět</button>
                                    </th>
                                    <th scope="col">Známka</th>
                                    <th scope="col">Váha</th>
                                    <th scope="col">Téma</th>
                                </tr>
                            </thead>
                            <tbody id="znamky">
                                ${znamkyRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-6t+ed+2i-1n-4w"
     data-ad-client="ca-pub-1168224081669943"
     data-ad-slot="5029128614"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
        </div>
    </div>
    <script>
        Array.prototype.groupBy = function () {
            return this.reduce(function (groups, item) {
                const val = item.children[1].innerHTML;
                groups[val] = groups[val] || [];
                groups[val].push(item);
                return groups;
            }, {})
        };

        function flatten(items) {
            const flat = [];

            items.forEach(item => {
                if (Array.isArray(item)) {
                    flat.push(...flatten(item));
                } else {
                    flat.push(item);
                }
            });

            return flat;
        }

        window.puvodniHTML = document.querySelector("#znamky").innerHTML;

        document.querySelector("#predmet").addEventListener("click", () => {
            // Remove default selected style from Datum button
            document.querySelector("#datum > button").classList.remove("focus");

            const groups = Array
                .from(document.querySelectorAll("#znamky tr"))
                .groupBy();

            const html = flatten(
                Object
                    .keys(groups)
                    .map((key, index) => {
                        if (index % 2) {
                            return groups[key]
                                .map((tr) => {
                                    tr.classList.add("predmet_even");
                                    return tr;
                                });
                        } else {
                            return groups[key]
                                .map((tr) => {
                                    tr.classList.add("predmet_odd");
                                    return tr;
                                });
                        }
                    })
            )
                .map((tr) => tr.outerHTML)
                .join("");
            document.querySelector("#znamky").innerHTML = html;
        });

        document.querySelector("#datum").addEventListener("click", () => {
            document.querySelector("#znamky").innerHTML = window.puvodniHTML;
        });
    </script>
</div>
</div>`;