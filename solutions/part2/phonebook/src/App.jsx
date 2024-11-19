import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    const nameFound = persons.find((person) => person.name === newName);
    const numberFound = persons.find((person) => person.number === newNumber);
    console.log("index", nameFound, numberFound);
    if (nameFound) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (numberFound) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }
    if(!(newName && newNumber)){
      alert(`All fields must be field`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchText={setSearchText} searchText={searchText}/>

      <h2>add a new</h2>
      <PersonForm addName={addName} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>
      <PersonList filteredPersons={filteredPersons}/>
      
    </div>
  );
};

export default App;
