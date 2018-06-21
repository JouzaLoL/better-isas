module.exports = (alert = "", announcement = "") => `<div class="container shadow-sm">
    <div class="row shadow-sm mb-3" style="color: #33528B">
        <div class="col pl-2" style="border-top: solid;">
            <h1 class="mb-0 p-1 font-weight-bold text-center">Better iSAS</h1>
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
                    <button type="submit" onclick="this.classList.add('pulse')" class="animated infinite btn btn-block" style="background: #33528B; color: white;">Přihlásit</button>
                </div>
            </form>
        </div>
        <div class="col-6 p-0">
            ${announcement}
        </div>
    </div>
    <div class="row">
        <div class="col text-center">
            <blockquote class="blockquote">
                <p class="mb-0 text-secondary font-italic font-weight-light">Libertatem informationis</p>
            </blockquote>
        </div>
    </div>
</div>`;
