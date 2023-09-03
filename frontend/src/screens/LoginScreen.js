import { useRef, useState } from "react"
import axios from 'axios';

const LoginScreen = () => {
    let baseUrl;
    // baseURL for API call between when it is deployed and in development (localhost) stage
    window.location.hostname.includes("localhost") ? baseUrl = "http://localhost:3000" : baseUrl = "undecided";
    console.log(baseUrl);

    // useRef to pull login data (email and password)
    const email = useRef(null);
    const password = useRef(null);

    const [incorrectPassword, setIncorrectPassword] = useState(null)

    const loginButton = () => {
        axios.post(`${baseUrl}/api/user/login`, {
            email: (email.current.value).trim(),
            password: (password.current.value).trim()
        }).then((response) => {
            const token = response.data.token;
            localStorage.setItem("token", token);
        }).then(() => {
            window.location.href = "/"
        }).catch((err) => {
            console.log(err)
            if (err.response.status === 401) {
                setIncorrectPassword("Username or password is incorrect!")
            }
        })
    }

    return (
        <div className="container">
            <div className="text-center interFont" style={{ marginTop: '15rem' }}>
                <h1 className="interFont2">Login</h1>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <form style={{ marginTop: '2rem' }}>
                            <div className="form-group">
                                <input type="email" className="form-control p-3" id="username" ref={email} rows="3" placeholder="Email" />
                                <input type="password" className="form-control p-3" id="password" rows="3" ref={password} placeholder="Password" />
                                <p className="colorRed mt-1">{incorrectPassword}</p>
                            </div>
                            <button type="button" onClick={loginButton} className="btn btn-primary btn-lg interFont2 p-3 px-4" style={{ marginTop: '2rem' }}>Login</button>
                            <p className="mt-2">
                                <a className="loginOrRegisterHref" href="/register">Don't have an account? Register</a>
                            </p>
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen