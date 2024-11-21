import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  if (!country) return;
  const languages = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h5>languages:</h5>
      <ul>{languages && languages.map((l) => <li key={l}>{l}</li>)}</ul>
      <img src={country.flags.png} />
    </div>
  );
};

const Weather = ({ weather }) => {
  if (!weather) return;
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Weather in {weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Conditions: {weather.weather[0].description}</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState("");
  const [names, setNames] = useState(null);
  const [country, setCountry] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [singleCountry, setSingleCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  
  const API_KEY = import.meta.env.VITE_API_KEY;
;

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const countries = response.data;
        setNames(countries.map((c) => c.name.common));
      });
  }, []);

  useEffect(() => {
    if (!filtered) return;
    if (filtered.length === 1) {
      setSingleCountry(filtered[0]);
    } else {
      setSingleCountry(null);
    }
  }, [filtered]);

  useEffect(() => {
    if (!singleCountry) {
      setCountry(null);
      setCity(null);
      return;
    }
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${singleCountry}`
      )
      .then((response) => {
        const country = response.data;
        setCountry(country);
        setCity(country.capital[0]);
      });
  }, [singleCountry]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  const handleFetch = (name) => {
    setSingleCountry(name);
  };

  useEffect(() => {
    if (!city) {
      setWeather(null);
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [city]);

  useEffect(() => {
    if (!names) return;

    const filteredNames = names.filter((n) =>
      n.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredNames);
    setFiltered(filteredNames);
  }, [names, value]);

  if (country) {
    console.log("country: ", country);
  }

  if (!names) return;

  return (
    <div>
      find countries: <input value={value} onChange={handleChange} />
      {}
      <div>
        {filtered &&
          filtered.length > 0 &&
          filtered.length <= 10 &&
          !country &&
          filtered.map((n) => (
            <p key={n}>
              {n}
              <button onClick={() => handleFetch(n)}>show</button>
            </p>
          ))}
      </div>
      <Country country={country} />
      <Weather weather={weather} />
    </div>
  );
};

export default App;
