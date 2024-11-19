import Person from "./Person";

const PersonList = ({filteredPersons}) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person}/>
      ))}
    </>
  );
};

export default PersonList;
