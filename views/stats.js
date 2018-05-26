
module.exports = (znamkyRows, prumeryRows, isVyznamenani) => `<div class="container">
    <div class="row shadow-sm">
        <div class="col pl-2">
            <h1 class="mb-0 p-1">Better iSAS</h1>
        </div>
    </div>
    <div class="row pt-3">
        <div class="col-sm-6">
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="card-title p-2">
                        <h5 class="m-0">Průměry</h5>
                    </div>
                    <div class="card-text">
                        <table class="table table-sm table-hover">
                            <thead class="thead">
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


            <h3>Vyznamenání: ${isVyznamenani ? "&#10004;" : "&#10060;"}</h3>

        </div>
        <div class="col-sm-6">
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