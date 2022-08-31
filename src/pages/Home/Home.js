import React, { useState, useEffect } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import withLoading from '../../hocs/withLoading';

import { getWeather } from '../../services/api';
import { useAuth } from '../../services/auth';
import Login from '../Login';

// const Home = () => {
//     const [weather, setWeather] = useState(null);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const fetchWeather = async () => {
//         try {
//             const res = await getWeather();
//             if (res.status === 200) setWeather(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         fetchWeather();
//     }, []);


//     const handleLogin = (e) => {
//         e.preventDefault();
//         setIsLoggedIn(true);
//         localStorage.setItem('isLoggedIn', true);
//     }

//     return (
//         <>
//             {localStorage.getItem('isLoggedIn')
//                 ? <div>
//                     <h1>{weather.weather[0].main}</h1>
//                 </div>
//                 : <form className='form'>
//                     <div className="container">
//                         <label><b>Username</b></label>
//                         <input className='username' type="text" placeholder="Enter Username" name="username" required></input>

//                         <label><b>Password</b></label>
//                         <input className='password' type="password" placeholder="Enter Password" name="password" required></input>

//                         <button className='login-btn' onClick={(e) => handleLogin(e)}>Login</button>
//                     </div>
//                 </form>}
//         </>
//     );
// }

const Home = (props) => {
    const [weather, setWeather] = useState(null);
    const [serach, setSearch] = useState('adana');

    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout()
        navigate('/login')
    }

    const fetchWeather = async () => {
        try {
            const res = await getWeather(serach);
            if (res.status === 200) {
                setWeather(res.data);
            }
            props.setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeather();
    }, [serach]);


    return (
        <div>
            <input type="text" placeholder="Search" onKeyDown={(e) => {
                if (e.key === 'Enter') { setSearch(e.target.value) }
            }} />
            {weather
                ?
                <div>
                    <h1>{weather.weather[0].main}</h1>
                    <h1>{weather.name}</h1>
                    <h1>{weather.sys.country}</h1>
                </div>
                :
                <div>Please enter a city</div>}

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default withLoading(Home);