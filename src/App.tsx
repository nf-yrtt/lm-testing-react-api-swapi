import React, { useState, useEffect } from 'react';
import './App.css';
import { Person } from './components/Person';

function App() {
  const [persons, setPersons] = useState<Array<Person>>([]);
  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = async () => {
    const apiResponse = await fetch(`https://swapi.dev/api/people/?format=json`);
    const json = await apiResponse.json() as { results: Person[] };
    setPersons(json.results);
    console.log()
  };

  return (
    <div className="person-container">
      <h2>First Person</h2>
      <p>Name: {persons[0]===undefined ? "" :persons[0].name}</p>
    </div>
    );
}

export default App;
