import React, { useState, createContext, useContext } from "react";

const Last3Context = createContext(); // general state

export const Last3Provider = ({ children }) => {
  let defaultValue = [];
  if (localStorage.getItem('weather')) {
    defaultValue = JSON.parse(localStorage.getItem('weather'));
  }

  const [weatherData, setWeatherData] = useState(defaultValue);

  const value = { // general store
    weatherData,
    setWeatherData
  };

  return (
    <Last3Context.Provider value={value}>{children}</Last3Context.Provider>
  );
};

export default Last3Context;

//export const useLast3 = () => useContext(Last3Context);
