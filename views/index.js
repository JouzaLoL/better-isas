module.exports = () => `<div class="container shadow-sm">
    <div class="row shadow-sm" style="color: #33528B">
        <div class="col pl-2">
            <h1 class="mb-0 p-1 font-weight-bold text-center">Better iSAS</h1>
        </div>
    </div>
    <div class="row pt-3">
        <div class="col-6">
            <form action="/stats" method="post">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Přihlašovací jméno" name="username" id="usr">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Heslo" name="password" id="pwd">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-block" style="background: #33528B; color: white;">Přihlásit</button>
                </div>
            </form>
        </div>
        <div class="col-6">
            <blockquote class="blockquote">
                <p class="mb-0" style="color: gray; font-style: italic;">Libertatem informationis</p>
            </blockquote>
        </div>
    </div>
</div>`;
