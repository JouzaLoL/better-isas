
module.exports = (znamkyRows, prumeryRows, isVyznamenani) => `<div class="container">
<div class="row">
    <div class="col-sm-12 text-center">
        <h1>${require("./common").randomTitle()}</h1>
        <hr>
    </div>
    <div class="col-sm-4">
        <h3>Průměry</h2>
        <table class="table table-sm table-striped table-responsive">
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
        <h3>Vyznamenání: ${isVyznamenani ? "&#10004;" : "&#10060;"}</h3>
        
    </div>
    <div class="col-sm-8">
        <h3>Známky</h2>
        <table class="table table-sm table-striped table-bordered table-responsive">
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
</div>`;