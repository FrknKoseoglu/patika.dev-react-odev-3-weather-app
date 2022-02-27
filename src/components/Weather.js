import { useEffect, useState } from "react";
import axios from "axios";

let date = new Date();

function epochDate(date) {
  let d = new Date(date * 1000);
  d = d.toLocaleString("tr", { weekday: "long" });
  return d;
}

function Weather() {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState({
    lat: "41.112663",
    lon: "29.02133",
    lang: "tr",
  });
  const [apiKey, setApiKey] = useState("d0cf27a1d2133e03c2555b9968d3df72");

  useEffect(() => {
    axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${city.lang}&appid=${apiKey}`
    ).then((res) => {
      setWeather(res.data);
    });
  }, []);

  return (
    <div className="boxes boxes-weather">
      {weather?.daily.map((day, index) => (
        <div key={index} className="box box-weather">
          <p>{epochDate(day.dt)}</p>
          <div className="img weather-img">
            <img
              alt={day.weather[0].description}
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            ></img>
          </div>
          <div className="tempc">
            <div className="day">{Math.floor(day.temp.day)}° </div>/
            <div className="night">{Math.floor(day.temp.night)}°</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Weather;
