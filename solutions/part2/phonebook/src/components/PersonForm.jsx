const PersonForm = ({addName, setNewName, setNewNumber, newName, newNumber}) => {
  return (
    <>
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
      </form>
    </>
  );
};

export default PersonForm;
