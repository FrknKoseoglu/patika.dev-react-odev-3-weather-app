import "./App.css";
import Weather from "./components/Weather";
import Select from "./components/Select";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <div className="App">
      <div className="weather-container">
        <div className="weather-row">
          <WeatherProvider>
            <Select />
            <Weather />
          </WeatherProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
