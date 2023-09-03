import NavBar from "../components/NavBar";
import axios from "axios";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import jwt_decode from 'jwt-decode';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const EditFormScreen = () => {
    let baseUrl;
    // baseURL for API call between when it is deployed and in development (localhost) stage
    window.location.hostname.includes("localhost") ? baseUrl = "http://localhost:3000" : baseUrl = "https://health-assessment-form.netlify.app/";
    console.log(baseUrl);

    const title = useRef(null);
    const description = useRef(null);

    const [copied, setCopied] = useState(null);
    const [titlePlaceholder, setTitlePlaceholder] = useState(null);
    const [descriptionPlaceholder, setDescriptionPlaceholder] = useState(null);

    const token = localStorage.getItem("token");

    const params = useParams();

    useEffect(() => {
        if (token === null) {
            window.location.href = "/login";
            return;
        }

        axios.get(`${baseUrl}/api/form/byUQID?id=${params.id}`)
            .then((response) => {

                if (response.data.length === 0) {
                    window.location.href = "/404";
                    return;
                }

                if (response.data[0].userID !== jwt_decode(token).id) {
                    window.location.href = "/404";
                    return;
                }

                setTitlePlaceholder(response.data[0].name);
                setDescriptionPlaceholder(response.data[0].description);
            });

    }, [baseUrl, params.id, token])

    const copyLinkButton = () => {
        setCopied("Link has been copied!");
    }

    const editFormButton = () => {
        axios.put(`${baseUrl}/api/form`, {
            name: (title.current.value).trim() || null, // using || null will allow my COALESCE in backend code to properly work
            description: (description.current.value).trim() || null,
            formUQID: params.id,
            userID: jwt_decode(token).id
        }).then(() => {
            alert("Successfully edited.");
            window.location.reload();
        })
    }

    const deleteFormButton = () => {
        if (window.confirm("Are you sure you want to delete this form?") === true) {
            axios.delete(`${baseUrl}/api/form?formUQID=${params.id}&userID=${jwt_decode(token).id}`)
                .then(() => {
                    alert("Form has been successfully deleted.");
                    window.location.href = "/profile";
                })
        }
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <CopyToClipboard className="btn btn-primary interFont2 px-4" text={`${baseUrl}/form/${params.id}`}>
                            <button onClick={copyLinkButton}>Copy Form Link</button>
                        </CopyToClipboard>
                        <div className="mb-4 colorGreen interFont">{copied}</div>
                    </div>
                    <div className="col-2">
                        <a href={`/viewform/${params.id}`} className="btn btn-primary interFont2 px-4">View Responses</a>
                    </div>
                </div>
                <form>
                    <div className="form-group">
                        <h3 className="interFont2 mb-4">Edit Form</h3>
                        <h4 className="interFont2">Title: </h4>
                        <input type="text" ref={title} className="form-control p-2 w-50 interFont mb-4" placeholder={titlePlaceholder} />
                        <h4 className="interFont2">Description: </h4>
                        <textarea type="text" ref={description} className="form-control p-3 w-50 interFont mb-4" placeholder={descriptionPlaceholder} />
                    </div>
                    <button onClick={editFormButton} type="button" className="btn btn-primary btn-lg interFont2 px-4">Edit Form</button>
                    <div>
                        <button onClick={deleteFormButton} type="button" className="btn btn-danger interFont2 px-4 mt-3">Delete Form</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditFormScreen