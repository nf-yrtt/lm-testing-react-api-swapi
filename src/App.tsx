import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import { SWAPIPerson, Person } from './components/Person';

function App() {
  const [persons, setPersons] = useState<Array<SWAPIPerson>>([]);
  const [errorCode, setErrorCode] = useState<number>(0);
  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = async () => {
    try {
      const apiResponse = await fetch(`https://swapi.dev/api/people/?format=json`);
      setErrorCode(apiResponse.status);
      if (apiResponse.ok){
        const json = await apiResponse.json() as { results: SWAPIPerson[] };
        setPersons(json.results);  
      }
    }
    catch (e) {
      console.error(e);
      console.log(errorCode);
    }

  };

  if (persons.length > 0) {
    return (
      <>
        <div className="person-container">
          <Person {...persons[0]} />
        </div>

      </>
    );
  }
  if (errorCode === 418) {
    return (
      <>
        <div className="person-container">
        418 I'm a tea pot
        </div>

      </>
    );
  }

  return (
    <>
      <div className="person-container">
        Oops... something went wrong try again
       </div>

    </>
  );
}

export default App;
