import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Last3Context from '../../context/Last3Context';
import withLoading from '../../hocs/withLoading';

import { getWeather } from '../../services/api';
import { useAuth } from '../../services/auth';



const Home = (props) => {
  const GITHUB_URL = 'https://github.com/amenooooo1';

  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const { weatherData, setWeatherData } = useContext(Last3Context);

  // const user = {
  //   name: 'Muhammed Emin',
  // }

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
      setError('No result found!');
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
    handleAdd(weatherItem);

  }

  const handleAdd = (weatherItem) => {
    if (weatherData.length === 3) {
      const newWeatherData = [...weatherData];
      newWeatherData.shift();
      newWeatherData.push(weatherItem);
      setWeatherData(newWeatherData);
      localStorage.setItem('weather', JSON.stringify(newWeatherData));
    }
    else {
      const newData = [...weatherData, weatherItem];
      setWeatherData(newData);
      localStorage.setItem('weather', JSON.stringify(newData));
    }
  }

  const showDetails = (item) => {
    setWeather(item);
  }


  const removeItem = (item, index) => {
    const newData = [...weatherData];
    newData.splice(index, 1);
    setWeatherData(newData);
    localStorage.setItem('weather', JSON.stringify(newData));
    console.log(weatherData);

  }

  useEffect(() => {
    // show last searched city's weather data
    if (localStorage.getItem('weather')) {
      setWeather(JSON.parse(localStorage.getItem('weather')).slice(-1)[0])
    }
    props.setLoading(false);
  }, [props]);


  return (
    <div>
      <header>
        <div className='search'>
          <input className='search-input' type="text" placeholder="Enter a city" value={search} onChange={handleSearchChange} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }} />
          <button className='search-btn' onClick={() => handleSearchSubmit()}>Search</button>
          <div className='error'>
            {error && <div>{error}</div>}
          </div>
        </div>
        <div className='dark-light-logout'>
          {/* <ThemeSwitcher /> */}
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className='weather'>
        <div className='weather-context'>
          {weatherData && weatherData.map((item, index) => (
            <div className='weather-context-item' key={index}>
              <h1 className='weather-context-item-title' onClick={() => showDetails(item)}>{item.name}</h1>
              <p className='hide' onClick={() => removeItem(item, index)}>X</p>
            </div>
          ))}
        </div>
        {weather
          && <div className='weather-details'>
            {/* error boundary test <h1 className='weather-details-name'>{user[0].name}</h1> */}
            <h1 className='weather-details-name'>{weather.name}</h1>
            <h1 className='weather-details-temp'>{(weather.main.temp - 273.15).toFixed()}°C</h1>
            <h1 className='weather-details-status'>{weather.weather[0].main}</h1>
            <div className='weather-details-hl'>
              <h1 className='weather-details-high'>H: {(weather.main.temp_min - 273.15).toFixed()}°C</h1>
              <h1 className='weather-details-low'>L: {(weather.main.temp_min - 273.15).toFixed()}°C</h1></div>
            <div className='weather-details-specs'>
              <h1 className='weather-details-feels'>Feels like {(weather.main.feels_like - 273.15).toFixed()}°C</h1>
              <h1 className='weather-details-wind'>Wind {((weather.wind.speed).toFixed()) * 3.6}Km/h</h1>
              <h1 className='weather-details-humidity'>Humidity %{weather.main.humidity}</h1>
              <h1 className='weather-details-pressure'>Pressure {weather.main.pressure}hPa</h1>
              <h1 className='weather-details-clouds'>Clouds %{weather.clouds.all}</h1>
              <h1 className='weather-details-visibility'>Visibility {(weather.visibility) / 1000} Km</h1>
              <h1 className='weather-details-sunrise'>Sunrise {(new Date(weather.sys.sunrise * 1000).toLocaleTimeString())}</h1>
              <h1 className='weather-details-sunset'>Sunset {(new Date(weather.sys.sunset * 1000).toLocaleTimeString())}</h1>
            </div>
          </div>
        }
      </div>
      <footer className='footer'>Made with ❤️️ by <a href={GITHUB_URL}>Amenooooo1</a></footer>
    </div>
  )
}

export default withLoading(Home);