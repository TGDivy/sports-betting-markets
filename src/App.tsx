import React, { useEffect } from "react";
import { getEvents } from "./api/smarkets-events/smarkets-events";

function App() {
  useEffect(() => {
    getEvents({}).then((events) => {
      console.log(events);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
