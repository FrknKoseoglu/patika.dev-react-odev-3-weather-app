import { useEffect, useContext } from "react";
import axios from "axios";
import WeatherContext from "../context/WeatherContext";

function epochDate(date) {
  let d = new Date(date * 1000);
  d = d.toLocaleString("tr", { weekday: "long" });
  return d;
}

function Weather() {
  const data = useContext(WeatherContext);

  useEffect(() => {
    axios(
      `https://gist.githubusercontent.com/FrknKoseoglu/dcbbb12e27d5e16ae4b2f864b9c2ae41/raw/1218ea96c54db789e1fed11958ee2fb7d47a4651/turkiye_il_koordinat_listesi_JSON.json`
    ).then((res) => data?.setCity(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="boxes boxes-weather">
      {data?.weather?.daily.map((day, index) => (
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
