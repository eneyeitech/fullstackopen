import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import { create, deletePerson, getAll, update } from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameFound = persons.find((person) => person.name === newName);
    const numberFound = persons.find((person) => person.number === newNumber);
    console.log("index", nameFound, numberFound);
    if (nameFound && window.confirm(`${nameFound.name} is already added to the phonebook, replace the old number with a new one?`)) {
      //alert(`${newName} is already added to phonebook`);
      const updatedPerson = {...nameFound, number: newNumber};
      update(updatedPerson.id, updatedPerson).then(data=>{
        setPersons(persons.map(person => person.id === data.id ? data : person));
        setNewName("");
        setNewNumber("");
      })
      return;
    }
    if (nameFound) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (numberFound) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }
    if (!(newName && newNumber)) {
      alert(`All fields must be field`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };

    create(newPerson).then((data) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (person && window.confirm(`Do you want to delete ${person.name}?`)) {
      console.log(`delete person with id ${id}`);
      deletePerson(id).then((data) => {
        console.log("deleted data", data);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchText={setSearchText} searchText={searchText} />

      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <PersonList
        filteredPersons={filteredPersons}
        deletePerson={(id) => handleDelete(id)}
      />
    </div>
  );
};

export default App;
