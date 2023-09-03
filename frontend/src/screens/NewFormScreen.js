import { useRef } from "react";
import NavBar from "../components/NavBar"
import axios from "axios";
import jwt_decode from "jwt-decode";

const NewFormScreen = () => {
    let baseUrl;
    // baseURL for API call between when it is deployed and in development (localhost) stage
    window.location.hostname.includes("localhost") ? baseUrl = "http://localhost:3000" : baseUrl = "https://health-assessment-form.netlify.app/";
    console.log(baseUrl);

    const title = useRef(null);
    const description = useRef(null);
    const token = localStorage.getItem("token");

    if (token === null) {
        window.location.href = "/login"
        return;
    }

    const createFormButton = () => {
        axios.post(`${baseUrl}/api/form/newform`, {
            name: (title.current.value).trim(),
            description: (description.current.value).trim(),
            userID: jwt_decode(token).id
        }).then(() => {
            alert("Form has been successfully made.")
            window.location.href = "/profile"
        })
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <form>
                    <div className="form-group">
                        <h1 className="interFont2">Title: </h1>
                        <input type="text" ref={title} className="form-control p-3 w-50 interFont mb-4" />
                        <h3 className="interFont2">Description: </h3>
                        <textarea type="text" ref={description} className="form-control p-4 w-50 interFont mb-4" />
                    </div>
                    <button onClick={createFormButton} type="button" className="btn btn-primary btn-lg interFont2 px-4 p-3">Create Form</button>
                </form>
            </div>
        </div>
    )
}

export default NewFormScreen