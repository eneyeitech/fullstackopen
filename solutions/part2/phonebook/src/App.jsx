import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "08051185104" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input
            onChange={(event) => setNewName(event.target.value)}
            value={newName}
          />
        </div>
        <div>
          number:{" "}
          <input
            onChange={(event) => setNewNumber(event.target.value)}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};

export default App;
