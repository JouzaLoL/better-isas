module.exports = () => `<div class="container">
    <div class="row">
        <div class="col-sm-4 text-center">
            <h1>${require("./common").randomTitle()}</h1>
            <hr>
            <form action="/stats" method="post">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Přihlašovací jméno" name="username" id="usr">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Heslo" name="password" id="pwd">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Přihlásit</button>
                </div>
            </form>
        </div>
    </div>
</div>`;
