import { useEffect, useState } from "react";

const NavBar = () => {

    const token = localStorage.getItem("token");
    const [loginOrLogOut, setLoginOrLogOut] = useState("Login");

    useEffect(() => {
        if (token !== null) {
            setLoginOrLogOut("Logout");
        }
    }, [token])

    const loginOrLogOutButton = () => {
        if (token !== null) {
            localStorage.removeItem("token");
            window.location.reload();
        }

        if (token === null) {
            window.location.href = "/login"
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light mb-5 bgLily">
            <div className="container interFont">
                <a className="navbar-brand interFont2" href="/">Health Assessment Form</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active me-3 interFont2" aria-current="page" href="/profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <button type="button" onClick={loginOrLogOutButton} className={loginOrLogOut === "Logout" ? "btn btn-danger" : "btn btn-primary"}>{loginOrLogOut}</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;