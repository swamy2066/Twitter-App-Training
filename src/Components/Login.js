import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usenavigate = useNavigate();


    const name = setUsername;


    const ProceedLogin = async (e) => {
        e.preventDefault();
        let regobj = { username, password };
        console.log(regobj);

        fetch("http://localhost:5000/users/" + name).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp)
            if (Object.keys(resp).length === 0) {
                toast.error('Please Enter valid username');
            } else {
                if (resp.password === password) {
                    toast.success('Success');
                    usenavigate('/')

                } else {
                    toast.error('Please Enter valid credentials');
                }

            }

        }).catch((err) => {
            toast.error('Login Failed due to :' + err.message);
        });

    }


     return (

        <section>

            <h1>Sign In</h1>
            <form onSubmit={ProceedLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
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
                <button disabled={!username || !password ? true : false}>Sign In</button>
            </form>
            <p>
                Need an account? <br />
                <span className="line">

                    <a href="http://localhost:3000/register">Sign Up</a>
                </span>
            </p>
        </section>

    )
}

export default Login
