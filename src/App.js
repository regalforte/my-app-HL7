import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HL7Validator from './components/hl7_validator';
import UsefulUtilities from './components/useful_utilities';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/img/HealthixLogo.png" className="App-logo" alt="logo" />
          <h3 className="App-title">Healthix HL7 Self Testing Tool</h3>
        </header>

        <UsefulUtilities />

        <p className="App-intro">
          <HL7Validator />
        </p>
      </div>
    );
  }
}

export default App;
