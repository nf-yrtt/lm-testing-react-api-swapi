import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import { SWAPIPerson, Person } from './components/Person';

function App() {
  const [persons, setPersons] = useState<Array<SWAPIPerson>>([]);
  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = async () => {
    const apiResponse = await fetch(`https://swapi.dev/api/people/?format=json`);
    const json = await apiResponse.json() as { results: SWAPIPerson[] };
    setPersons(json.results);
  };

  return (
    <>
      <div className="person-container">
        <Person {...persons[0]} />
      </div>

    </>
  );
}

export default App;
