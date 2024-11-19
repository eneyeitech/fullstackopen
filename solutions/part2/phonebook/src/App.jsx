import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

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
