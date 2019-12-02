// Display header
document.write(`
    <div class="container-fluid" id="mainHeader">
        <div class="row">
            <div class="col-4 headerColumn text-center" id="leftcol">
                <a href="login.html">
                    <button id="profileViewButton" type="button" class="btn btn-primary margin-bottom-15 btn-bg-color btn-hover">Login/Signup</button>
                </a>
            </div>
            <div class="col-4 headerColumn">
                <a href="index.html" id="headerLogoText"><h1>StudySource</h1></a>
            </div>
    
            <div class="col-4 headerColumn text-center">
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="p-4">
                        <div class="list-group">
                            <a href="search.html" class="list-group-item border border-dark">Search</a>
                            <a href="underConstruction.html" class="list-group-item border border-dark">About us</a>
                        </div>
                    </div>
                </div>
                <nav class="navbar">
                    <button type="button" class="fa fa-bars btn navbar-toggler btn-bg-color btn-hover" id="hamburgerMenu"
                    data-toggle="collapse"
                    data-target="#navbarToggleExternalContent"
                    aria-controls="navbarToggleExternalContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    </button>
                </nav>
            </div>
            
        </div>
    </div>
`);


function init() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
        document.getElementById("profileViewButton").innerHTML = "View Profile"

        } else {
        document.getElementById("profileViewButton").innerHTML = "Login"
        }
    })
}
init();