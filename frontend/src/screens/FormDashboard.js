import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import jwt_decode from 'jwt-decode';

const FormDashboard = () => {
    let baseUrl;
    // baseURL for API call between when it is deployed and in development (localhost) stage
    window.location.hostname.includes("localhost") ? baseUrl = "http://localhost:3000" : baseUrl = "undecided";
    console.log(baseUrl);

    const params = useParams();
    const [data, setData] = useState([]);
    const [copied, setCopied] = useState(null);
    const token = localStorage.getItem("token");

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
            });

        axios.get(`${baseUrl}/api/form/data?id=${params.id}`)
            .then((response) => {
                setData(response.data);
            });

    }, [baseUrl, params.id, token])

    const copyLinkButton = () => {
        setCopied("Link has been copied!");
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
                        <a href={`/viewform/${params.id}/edit`} className="btn btn-primary interFont2 px-4">Edit Form</a>
                    </div>
                </div>

                <h3 className="interFont2">Responses</h3>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Temperature</th>
                            <th scope="col">Symptoms - Past 14 days</th>
                            <th scope="col">In contact with suspected/diagnosed COVID-19 patients - Past 14 days</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(data =>
                            <tr className="interFont" key={data.formID}>
                                <th>
                                    {data.name}
                                </th>
                                <th className={data.temperature > 37.5 ? "colorBrightRed" : ""}>
                                    {data.temperature} °C
                                </th>
                                <th className={data.symptoms === "true" ? "colorBrightRed" : ""}>
                                    {data.symptoms}
                                </th>
                                <th className={data.contactWithCOVID === "true" ? "colorBrightRed" : ""}>
                                    {data.contactWithCOVID}
                                </th>
                                <th>
                                    {data.dateAdded.slice(0, 10)}
                                </th>
                                <th>
                                    {data.timeAdded}
                                </th>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FormDashboard