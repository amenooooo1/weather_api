import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Last3Context from '../../context/Last3Context';
import withLoading from '../../hocs/withLoading';

import { getWeather } from '../../services/api';
import { useAuth } from '../../services/auth';

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
  const { weatherData, setWeatherData } = useContext(Last3Context);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout()
    navigate('/login')
  }

  const fetchWeather = async () => {
    props.setLoading(true);
    setError(null)
    try {
      const res = await getWeather(search);
      if (res.status === 200) {
        setWeather(res.data);
        addToContext(res.data);
        setSearch('')
      }
    } catch (error) {
      //console.log(error);
      setError('Please enter a valid city!');
      //setWeather(null);
      setSearch('')
    }
    finally {
      props.setLoading(false);
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }
  const handleSearchSubmit = () => {
    if (search) {
      fetchWeather();
    } else {
      setError('Please enter a city!');
    }
  }

  const addToContext = (weatherItem) => {
    // if (weatherData) {
    //   weatherData.map(item => (
    //     item.name === weatherItem.name ? null : handleAdd(weatherItem)
    //   ))
    // }
    if (weatherData.length === 3) {
      const newWeatherData = [...weatherData];
      newWeatherData.shift();
      newWeatherData.push(weatherItem);
      setWeatherData(newWeatherData);
      localStorage.setItem('weather', JSON.stringify(newWeatherData));
    } else {
      const newData = [...weatherData, weatherItem];
      setWeatherData(newData);
      localStorage.setItem('weather', JSON.stringify(newData));
    }

  }

  // const handleAdd = (weatherItem) => {
  //   if (weatherData.length === 3) {
  //     const newWeatherData = [...weatherData];
  //     newWeatherData.shift();
  //     newWeatherData.push(weatherItem);
  //     setWeatherData(newWeatherData);
  //     localStorage.setItem('weather', JSON.stringify(newWeatherData));
  //   } else {
  //     const newData = [...weatherData, weatherItem];
  //     setWeatherData(newData);
  //     localStorage.setItem('weather', JSON.stringify(newData));
  //   }

  // }

  useEffect(() => {
    props.setLoading(false);
  }, []);


  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <div className='home-container'>
        <div className='search'>
          <input type="text" placeholder="Enter a city" value={search} onChange={handleSearchChange} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }} />
          <button onClick={() => handleSearchSubmit()}>Search</button>
        </div>
      </div>
      <div className='error'>
        {error && <div>{error}</div>}
      </div>
      {weather
        && <div className='weather-details'>
          <h1>{weather.weather[0].main}</h1>
          <h1>{weather.name}</h1>
        </div>
      }

      {weatherData && weatherData.map((item, index) => (
        <div key={index}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </>
  )
}

export default withLoading(Home);