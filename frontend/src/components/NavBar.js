const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light mb-5 bgLily">
            <div className="container">
                <a className="navbar-brand interFont2" href="#">Health Assessment Form</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/adminprofile">View</a>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" id="logout">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;