import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({country}) => {
  if(!country) return;
  const languages = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h5>languages:</h5>
      <ul>
        {languages && languages.map(l=><li key={l}>{l}</li>)}
      </ul>
      <img src={country.flags.png}/>
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState("");
  const [names, setNames] = useState(null);
  const [country, setCountry] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [singleCountry, setSingleCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const countries = response.data;
        setNames(countries.map((c) => c.name.common));
      });
  }, []);

  useEffect(()=>{
    if(!filtered) return;
    if(filtered.length === 1){
      setSingleCountry(filtered[0])
    }else{
      setSingleCountry(null)
    }
  },[filtered])

  useEffect(()=>{
    if(!singleCountry){
       setCountry(null)
       return;
    }
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${singleCountry}`)
      .then((response) => {
        const country = response.data;
        setCountry(country)
      });
  },[singleCountry]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  
  useEffect(()=>{
    if(!names) return;
    
    const filteredNames = names.filter((n) =>
      n.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredNames);
    setFiltered(filteredNames)
  
  },[names, value])

  

  if(country){
    console.log('country: ', country);
  }

  return (
    <div>
      find countries: <input value={value} onChange={handleChange} />
      {}
      <div>
        {filtered &&
          filtered.length > 0 &&
          filtered.length <= 10 &&
          !country &&
          filtered.map((n) => <p key={n}>{n}</p>)}
      </div>
      <Country country={country}/>
    </div>
  );
};

export default App; 