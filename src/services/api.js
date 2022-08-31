import axios from 'axios';

const API_key = 'a0e316632238e185377d0402f6cb4f27'

export const getWeather = (city) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${API_key}&q=${city}`);
};

/**https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${API_key} */