import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/auth';


const Login = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = () => {
        auth.login(user, pass) ? navigate('/home', { replace: true }) : alert("Invalid username or password");
    }
    const handleLoginn = () => {
        auth.login('admin', 'admin')
        navigate('/home', { replace: true })
    }

    return (
        <form className='form'>
            <div className="container">
                <label><b>Username</b></label>
                <input className='username' type="username" placeholder="Enter Username" name="username" required onChange={(e) => setUser(e.target.value)}></input>


                <label><b>Password</b></label>
                <input className='password' type="password" placeholder="Enter Password" name="password" required onChange={(e) => setPass(e.target.value)}></input>

                <button className='login-btn' type='button' onClick={handleLogin}>Login</button>
                <button className='login-btn' type='button' onClick={handleLoginn}>Loginnnnn</button>
            </div>
        </form>
    );
}

export default Login;