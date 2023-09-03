import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const FormDashboard = () => {
    let baseUrl;
    // baseURL for API call between when it is deployed and in development (localhost) stage
    window.location.hostname.includes("localhost") ? baseUrl = "http://localhost:3000" : baseUrl = "undecided";
    console.log(baseUrl);

    const params = useParams();
    const [data, setData] = useState([]);
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}/api/form/data?id=${params.id}`)
            .then((response) => {
                setData(response.data);
            })
    }, [baseUrl, params.id])

    const copyLinkButton = () => {
        setCopied("Link has been copied!");
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <CopyToClipboard className="btn btn-primary interFont2 px-4" text={`${baseUrl}/form/${params.id}`}>
                <button onClick={copyLinkButton}>Copy Form Link</button>
                </CopyToClipboard>
                <div className="mb-4 colorGreen interFont">{copied}</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Temperature</th>
                            <th scope="col">Symptoms in the past 14 days</th>
                            <th scope="col">In contact with suspected/diagnosed COVID-19 patients in the past 14 days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(data =>
                            <tr className="interFont">
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
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FormDashboard