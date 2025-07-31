import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import { create, deletePerson, getAll, update } from "./services/person";
import NotificationSuccess from "./components/NotificationSuccess";
import NotificationFailure from "./components/NotificationFailure";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

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
    if (
      nameFound &&
      window.confirm(
        `${nameFound.name} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      //alert(`${newName} is already added to phonebook`);
      const updatedPerson = { ...nameFound, number: newNumber };
      update(updatedPerson.id, updatedPerson)
        .then((data) => {
          setPersons(
            persons.map((person) => (person.id === data.id ? data : person))
          );
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`${newName} updated succesfully`);
          setTimeout(() => setSuccessMessage(null), 5000);
        })
        .catch((e) => {
          setNewName("");
          setNewNumber("");
          setFailureMessage(
            `the person '${newName}' was already deleted from server`
          );
          setPersons(
            persons.filter((person) => person.id !== updatedPerson.id)
          );
          setTimeout(() => setFailureMessage(null), 5000);
        });

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
    setSuccessMessage(`${newName} added succesfully`);
    setTimeout(() => setSuccessMessage(null), 5000);
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
      <NotificationSuccess message={successMessage} />
      <NotificationFailure message={failureMessage} />

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
