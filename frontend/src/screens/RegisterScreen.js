import { useRef } from "react";

const RegisterScreen = () => {

    // useRef to pull register data (username and password)
    const userName = useRef(null);
    const password = useRef(null);

    return (
        <div className="container">
            <div className="text-center interFont" style={{ marginTop: '15rem' }}>
                <h1 className="interFont2">Register</h1>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <form style={{ marginTop: '2rem' }}>
                            <div className="form-group">
                                <input type="text" className="form-control p-3" id="username" ref={userName} rows="3" placeholder="Username" />
                                <input type="password" className="form-control p-3" id="password" rows="3" ref={password} placeholder="Password" />
                            </div>
                            <button type="button" className="btn btn-primary btn-lg interFont2 p-3 px-4" style={{ marginTop: '2rem' }}>Register</button>
                            <p className="mt-2">
                                <a className="loginOrRegisterHref" href="/login">Already have an account? Login</a>
                            </p>
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen