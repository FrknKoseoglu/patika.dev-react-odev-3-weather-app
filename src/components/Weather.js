import { useEffect, useState } from "react";
import axios from "axios";

function epochDate(date) {
  let d = new Date(date * 1000);
  d = d.toLocaleString("tr", { weekday: "long" });
  return d;
}

function Weather() {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const [apiKey, setApiKey] = useState("d0cf27a1d2133e03c2555b9968d3df72");

  useEffect(() => {
    selectChange();
    axios(
      `https://gist.githubusercontent.com/FrknKoseoglu/dcbbb12e27d5e16ae4b2f864b9c2ae41/raw/1218ea96c54db789e1fed11958ee2fb7d47a4651/turkiye_il_koordinat_listesi_JSON.json`
    ).then((res) => setCity(res.data));
  }, []);

  function selectChange(e) {
    let findCity = {};
    e
      ? (findCity = city.find((x) => x.plate === e.target.value))
      : (findCity = { lat: "0", long: "0" });

    axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${findCity.lat}&lon=${findCity.long}&units=metric&lang=tr&appid=${apiKey}`
    ).then((res) => {
      setWeather(res.data);
    });
  }

  return (
    <div>
      <select onChange={(e) => selectChange(e)}>
        <option selected disabled value="01">
          Bir İl Seçiniz:
        </option>
        {city?.map((data) => (
          <option
            value={data.plate}
            key={data.plate}
            data-lat={data.lat}
            data-long={data.long}
            data-name={data.name}
            data-plate={data.plate}
          >
            {data.name}
          </option>
        ))}
      </select>
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
    </div>
  );
}

export default Weather;
