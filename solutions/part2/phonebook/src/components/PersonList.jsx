import Person from "./Person";

const PersonList = ({filteredPersons, deletePerson}) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson}/>
      ))}
    </>
  );
};

export default PersonList;
