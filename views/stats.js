
module.exports = (znamkyRows, prumeryRows, isVyznamenani) => `<div class="container shadow-sm">
    <div class="row shadow-sm" style="color: #33528B">
        <div class="col pl-2">
            <h1 class="mb-0 p-1 font-weight-bold text-center">Better iSAS</h1>
        </div>
    </div>
    <div class="row pt-3">
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
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="card-title p-2" style="border-top: solid 3px #33528B">
                        <h5 class="m-0">Ostatní</h5>
                    </div>
                    <div class="card-text">
                        <table class="table table-sm table-hover table-striped table-borderless">
                            <tbody>
                                <th>Vyznamenání: ${isVyznamenani ? "&#10004;" : "&#10060;"}</th>
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
                        <h5 class="m-0">Známky</h5>
                    </div>
                    <div class="card-text">
                        <table class="table table-responsive table-sm table-hover table-striped table-borderless">
                            <thead class="thead" style="
                                background: #33528B;
                                color: white;
                                ">
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
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6">

        </div>
    </div>
</div>
</div>`;