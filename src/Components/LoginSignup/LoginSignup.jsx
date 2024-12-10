import React, { useState } from 'react'
import './LoginSignup.css'
import email from '../Assets/email.png'
import password from '../Assets/password.png'
import user from '../Assets/user.png'


function LoginSignup() {
     const [ action, setAction] = useState("Sign Up");
  return (
    <div className='container'>
        <div className='header'>
        <div className='text'>{action}</div>
        <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className='input'>
                <img src={user} alt="" width={6*4}  />
                <input type="text" placeholder="Name" />
            </div>

            <div className='input'>
                <img src={email} alt="" width={6*4}  />
                <input type="email" placeholder="Email Id" />
            </div>

            <div className='input'>
                <img src={password} alt="" width={6*4} />
                <input type="password" placeholder="Password" />
            </div>
        </div>
          <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
          <div className="submit-contanier">
            <div className={action==="login"?"submit gray":"submit"} onclick={() => {setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"}onClick= {() => {setAction("Login")} }>Login</div>
          </div>
    </div>
  )
}

export default LoginSignup
