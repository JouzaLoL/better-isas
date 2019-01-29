module.exports = ({ detaily, histogram }) => `<div class="container shadow-sm">
    <div class="row shadow-sm mb-3" style="color: #33528B">
        <div class="col pl-2">
            <h1 class="animated pulse mb-0 p-1 font-weight-bold text-center float-left">EK</h1>
            <a href="/stats" class="float-right float-right btn btn-light" style="margin-top: 10px;">&lt; Zpět</a>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="card-title p-2" style="border-top: solid 3px #33528B">
                        <h5 class="m-0">Detail</h5>
                    </div>
                    <div class="card-text">
                        ${detaily}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="card-title p-2" style="border-top: solid 3px #33528B">
                        <h5 class="m-0">Histogram</h5>
                    </div>
                    <div class="card-text">
                        ${histogram}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;