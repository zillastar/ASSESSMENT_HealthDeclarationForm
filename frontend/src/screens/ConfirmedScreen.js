import NavBar from "../components/NavBar"

const ConfirmedScreen = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center" id="formSubmit" >
                    <img src={require("../assets/tick.png")} style={{ width: "200px" }} alt="tick" />
                    <div className="text-center mt-3 interFont">
                        <h4>Form successfully submitted!</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmedScreen