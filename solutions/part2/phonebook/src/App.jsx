import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const found = persons.find((person)=> person.name === newName);
    console.log('index', found)
    if(found){
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName }));
    setNewName('')
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={addName}>
        <div>
          name:{" "}
          <input
            onChange={(event) => setNewName(event.target.value)}
            value={newName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  );
};

export default App;
