import NavBar from "../components/NavBar";

const NoScreen = () => {
    return (
        <div>
            <NavBar />
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "650px" }}>
                <h1 className="interFont2">404 Not Found</h1>
            </div>
        </div>

    )
}

export default NoScreen;