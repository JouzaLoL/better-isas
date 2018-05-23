module.exports = (znamkyRows, prumeryRows) => `<div class="container">
<div class="row">
    <div class="col-sm-12">
        <h1>Better iSAS</h1>
    </div>
    <div class="col-sm-4">
        <h2>Průměry</h2>
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
    </div>
    <div class="col-sm-8">
        <h2>Známky</h2>
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