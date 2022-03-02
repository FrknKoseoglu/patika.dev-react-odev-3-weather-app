/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import axios from "axios";
import WeatherContext from "../context/WeatherContext";

function Select() {
  const data = useContext(WeatherContext);

  useEffect(() => {
    selectChange();
  }, []);

  function selectChange(e) {
    let findCity = {};
    e
      ? (findCity = data.city.find((x) => x.plate === e.target.value))
      : (findCity = { lat: "37", long: "35.321333" });

    axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${findCity.lat}&lon=${findCity.long}&units=metric&lang=tr&appid=${data?.apiKey}`
    ).then((res) => {
      data.setWeather(res.data);
    });
  }

  return (
    <select onChange={(e) => selectChange(e)}>
      {data?.city?.map((data) => (
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
  );
}

export default Select;
