import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import HL7Validator from './components/hl7_validator';
import UsefulUtilities from './components/useful_utilities';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <UsefulUtilities />
        <HL7Validator />
      </div>
    );
  }
}

export default App;
