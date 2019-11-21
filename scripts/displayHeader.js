// Display header
document.write(`
    <div class="container-fluid" id="mainHeader">
        <div class="row">
        
            <div class="col-sm-4 headerColumn">
                <a href="login.html"><button type="button" class="btn btn-primary">Login/Signup</button></a>
            </div>
    
            <div class="col-sm-4 headerColumn">
                
                <a href="index.html" id="headerLogoText"><h1>StudySource</h1></a>
            </div>
    
            <div class="col-sm-4 headerColumn">
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="p-4">
                        <h5 class="text-white h4">Collapsed content</h5>
                        <span class="text-muted">Toggleable via the navbar brand.</span>
                    </div>
                </div>
                <nav class="navbar">
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarToggleExternalContent"
                            aria-controls="navbarToggleExternalContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span class="glyphicon glyphicon-menu-hamburger btn btn-primary" id="hamburgerMenu"
                              aria-hidden="true"></span>
                    </button>
                </nav>
            </div>
            
        </div>
    </div>
`);
