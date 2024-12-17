import React, { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider';
import axios from '../service/axios';

const LOGIN_URL = 'http://localhost:5000/users';
const Login = () => {
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [name, password])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.get(LOGIN_URL, JSON.stringify({ name, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true

                });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ name, password, roles, accessToken });
            setName('');
            setPassword('');
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {

                setErrMsg('Missing Username or password');

            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed')
            }

            errRef.current.focus();
        }

    }


    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in !</h1>
                    <br />
                    <p>
                        <a href="http://localhost:3000/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" :
                        "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />

                        <label htmlFor="password">password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button disabled={!name || !password  ? true : false}>Sign In</button>
                    </form>
                    <p>
                        Need an account? <br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="http://localhost:3000/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}

        </>
    )
}

export default Login
