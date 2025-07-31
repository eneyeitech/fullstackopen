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

  // Helper function to display failure messages
  const displayFailureMessage = (message) => {
    setFailureMessage(message);
    setTimeout(() => {
      setFailureMessage(null);
    }, 5000);
  };

  // Helper function to display success messages
  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  useEffect(() => {
    getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        // Handle initial load errors
        console.error("Error fetching persons:", error);
        displayFailureMessage("Failed to load phonebook entries.");
      });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    // Client-side check for empty fields (before hitting server)
    if (!newName || !newNumber) {
      displayFailureMessage("Both name and number fields must be filled.");
      return;
    }

    const newPersonObject = { name: newName, number: newNumber };
    const nameFound = persons.find((person) => person.name === newName);

    if (nameFound) {
      // Logic for updating an existing person
      if (
        window.confirm(
          `${nameFound.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...nameFound, number: newNumber };
        update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            displaySuccessMessage(`${returnedPerson.name} updated successfully!`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Error updating person:", error.response);
            // Check if it's a validation error from the backend
            if (error.response && error.response.data && error.response.data.error) {
              displayFailureMessage(error.response.data.error);
            } else if (error.response && error.response.status === 404) {
              // Specific handling for 404 (person might have been deleted)
              displayFailureMessage(
                `Information of '${nameFound.name}' has already been removed from server.`
              );
              setPersons(
                persons.filter((person) => person.id !== updatedPerson.id)
              ); // Remove from local state
            } else {
              displayFailureMessage("Failed to update person. Please try again.");
            }
          });
      }
      return; // Stop further execution if update logic is handled
    }

    // Logic for creating a new person
    create(newPersonObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        displaySuccessMessage(`${returnedPerson.name} added successfully!`);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error("Error creating person:", error.response);
        // Check if it's a validation error from the backend (e.g., number format)
        if (error.response && error.response.data && error.response.data.error) {
          displayFailureMessage(error.response.data.error);
        } else {
          displayFailureMessage("Failed to add person. Please try again.");
        }
      });
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (personToDelete && window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          displaySuccessMessage(`${personToDelete.name} deleted successfully!`);
        })
        .catch((error) => {
          console.error("Error deleting person:", error.response);
          if (error.response && error.response.status === 404) {
            // Specific handling for 404 (person might have been already deleted)
            displayFailureMessage(
              `Information of '${personToDelete.name}' was already removed from server.`
            );
            setPersons(persons.filter((person) => person.id !== id)); // Ensure it's removed from local state
          } else if (error.response && error.response.data && error.response.data.error) {
            displayFailureMessage(error.response.data.error);
          }
          else {
            displayFailureMessage("Failed to delete person. Please try again.");
          }
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

      <h2>Add a new</h2>
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
        deletePerson={handleDelete} // Pass handleDelete directly
      />
    </div>
  );
};

export default App;