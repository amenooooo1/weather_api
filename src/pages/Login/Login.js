import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';


const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  // const user1 = {
  //   name: 'Muhammed Emin',
  // }

  const handleLogin = () => {
    if (user === '' || pass === '') {
      setError('Please enter username and password');
    }
    else {
      auth.login(user, pass);
      (localStorage.getItem('isLoggedIn')) === 'true' ? navigate('/home', { replace: true }) : setError('Invalid credentials');
    }
  }

  return (
    <form className='form'>
      <div className="container">
        <input className='username' type="username" placeholder="Enter Username" name="username" required onChange={(e) => setUser((e.target.value).toLowerCase())}></input>


        <input className='password' type="password" placeholder="Enter Password" name="password" required onChange={(e) => setPass(e.target.value)}></input>
        {error && <div className='error'>
          {error}
        </div>}
        {/* error boundary test <h1 className='weather-details-name'>{user1[0].name}</h1> */}


        <button className='login-btn' type='button' onClick={handleLogin}>Login</button>
      </div>
    </form>
  );
}

export default Login;