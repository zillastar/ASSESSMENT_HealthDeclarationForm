import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import axios from "axios";
import jwt_decode from "jwt-decode";

const ProfileScreen = () => {
    let baseUrl;
    // baseURL for API call between when it is deployed and in development (localhost) stage
    window.location.hostname.includes("localhost") ? baseUrl = "http://localhost:3000" : baseUrl = "https://health-assessment-form.onrender.com";
    console.log(baseUrl);

    const token = localStorage.getItem("token");
    const [userForms, setUserForms] = useState([]);

    useEffect(() => {
        if (token === null) {
            window.location.href = "/"
            return;
        }

        const decode = jwt_decode(token)

        axios.get(`${baseUrl}/api/form/byUser?id=${decode.id}`)
            .then((response) => {
                setUserForms(response.data)
            }).catch((err) => {
                console.log(err)
            });

    }, [baseUrl, token])

    return (
        <div>
            <NavBar />
            <div className="container">
                <a type="button" className="mb-4 btn btn-primary interFont2 px-4" href="/newform">New Form</a>
                <div className="row">
                    {userForms.map(form =>
                        <div className="col-12 col-md-3">
                            <a className="card me-2 mb-2" href={`/viewform/${form.formUQID}`}>
                                <div className="card-body">
                                    <div className="interFont2">{form.name}</div>
                                    <div>{form.description}</div>
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen