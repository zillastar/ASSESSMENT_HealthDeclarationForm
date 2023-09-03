import { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormScreen = () => {
    let baseUrl;
    // baseURL for API call between when it is deployed and in development (localhost) stage
    window.location.hostname.includes("localhost") ? baseUrl = "http://localhost:3000" : baseUrl = "https://health-assessment-form.netlify.app/";
    console.log(baseUrl);

    // useRef variables to retrieve form data from the inputs
    const userName = useRef(null);
    const temperature = useRef(null);
    const symptoms = useRef(null);
    const contactWithCOVID = useRef(null);

    // useState variables for form-validation checking
    const [requiredUserName, setRequiredUserName] = useState(null);
    const [requiredTemperature, setRequiredTemperature] = useState(null);
    const [requiredSymptoms, setRequiredSymptoms] = useState(null);
    const [requiredContactWithCOVID, setRequiredContactWithCOVID] = useState(null);

    // set title and description of the form.
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const params = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/api/form/byUQID?id=${params.id}`)
            .then((response) => {
                if (response.data.length === 0) {
                    window.location.href = "/404"
                    return;
                }
                setTitle(response.data[0].name);
                setDescription(response.data[0].description);
            })
    })

    // button onClick function
    const submitForm = () => {

        // check if all fields are filled up. if not, form will not go through & user will be told to fill the empty fields.
        if (userName.current.value === "" || temperature.current.value === "" || contactWithCOVID.current.value === "novalue" || symptoms.current.value === "novalue") {

            if (userName.current.value === "") {
                setRequiredUserName("You must fill this required field!")
            } else if (requiredUserName === "You must fill this required field!") {
                // rechecks in-case user has filled the input after initial validation reminder
                setRequiredUserName(null)
            }

            if (temperature.current.value === "") {
                setRequiredTemperature("You must fill this required field!")
            } else if (requiredTemperature === "You must fill this required field!") {
                setRequiredTemperature(null)
            }

            if (symptoms.current.value === "novalue") {
                setRequiredSymptoms("You must fill this required field!")
            } else if (requiredSymptoms === "You must fill this required field!") {
                setRequiredSymptoms(null)
            }

            if (contactWithCOVID.current.value === "novalue") {
                setRequiredContactWithCOVID("You must fill this required field!")
            } else if (requiredContactWithCOVID === "You must fill this required field!") {
                setRequiredContactWithCOVID(null)
            }

            return;
        }

        // POST request to upload form information to database
        axios.post(`${baseUrl}/api/form`, {
            name: (userName.current.value),
            temperature: (temperature.current.value).trim(),
            symptoms: (symptoms.current.value).trim(),
            contactWithCOVID: (contactWithCOVID.current.value).trim(),
            formUQID: params.id
        }).then(() => {
            // For any debugging purposes
            console.log(userName.current.value);
            console.log(temperature.current.value);
            console.log(symptoms.current.value);
            console.log(contactWithCOVID.current.value);

            // Final step after post request is successful
            window.location.href = "/form/complete"
        });
    };

    return (
        <div>
            <NavBar />
            <div className="container d-flex justify-content-center">
                <form className="w-75 formBox interFont">
                    <h1>{title}</h1>
                    <h5 className='mb-5'>{description}</h5>
                    <div className="form-group">
                        <p>1. Please state your name.</p>
                        <input type="text" className="form-control" rows="3" ref={userName} placeholder="Enter your name..." required />
                        <div className="mb-4 mt-1 colorRed">{requiredUserName}</div>
                        <p>2. Please record down your temperature (°C).</p>
                        <input type="text" className="form-control" rows="3" ref={temperature} placeholder="Enter your temperature..." />
                        <div className="mb-4 mt-1 colorRed">{requiredTemperature}</div>
                        <p>3. Do you have any of the following symptoms now or within the last 14 days: Cough, smell/test impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea, runny nose(even if your symptoms are mild)?</p>
                        <select className="form-select" ref={symptoms} aria-label="Covid symptoms">
                            <option value="novalue">Please select...</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <div className="mb-4 mt-1 colorRed">{requiredSymptoms}</div>
                        <p>4. Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?</p>
                        <select className="form-select" ref={contactWithCOVID} aria-label="Covid symptoms">
                            <option value="novalue">Please select...</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <div className="mb-4 mt-1 colorRed">{requiredContactWithCOVID}</div>
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary btn-lg fs-6 p-3 px-4 interFont2">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default FormScreen