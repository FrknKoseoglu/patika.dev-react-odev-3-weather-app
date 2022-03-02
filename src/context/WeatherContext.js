import { createContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const apiKey = "d0cf27a1d2133e03c2555b9968d3df72";

  const values = {
    apiKey,
    weather,
    setWeather,
    city,
    setCity,
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContext;
