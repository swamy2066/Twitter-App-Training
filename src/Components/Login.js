import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();




    const ProceedLogin = async (e) => {
        e.preventDefault();
        let regobj = { username, password };
        console.log(regobj);

        fetch(`http://localhost:5000/users?name=${username}&password=${password}`).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp)
            if (resp.length === 0) {
                toast.error('Please Enter valid credientials');
            } else {
                navigate('/post')

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
