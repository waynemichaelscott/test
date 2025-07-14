import React from 'react';
import './App.css';
import WorldClock from './components/WorldClock/WorldClock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the World Clock App</h1>
      </header>
      <main>
        <WorldClock />
      </main>
    </div>
  );
}

export default App;
