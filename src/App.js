import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/game/game';
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Game></Game>
        <p>
          Edit <code>src/App.js</code> and load to reload.
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
