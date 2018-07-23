import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HL7SelfTester from './components/HL7SelfTester';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HL7SelfTester />
      </div>
    );
  }
}

export default App;
