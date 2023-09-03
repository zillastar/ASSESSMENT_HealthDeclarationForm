

const HomeScreen = () => {
    let baseUrl;
    window.location.hostname.includes("localhost") ? baseUrl = "http://localhost:3000" : baseUrl = "https://health-assessment-form.netlify.app";

    console.log(baseUrl)

    const token = localStorage.getItem("token");

    if (token != null) {
        window.location.href = "/profile";
        return;
    }

    const loginButton = () => {
        localStorage.setItem("fromHome", "exists");
        window.location.href = "/login";
        return;
    }

    return (
        <div className="container">
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <h1 className="interFont2">Health Assessment Form</h1>
                <button onClick={loginButton} className="btn btn-primary btn-lg interFont2 p-3 px-4 mt-2">Login</button>
                <a href="/register" className="btn btn-primary btn-lg interFont2 p-3 px-4 mt-3">Register</a>
            </div>
        </div>
    )
}

export default HomeScreen;