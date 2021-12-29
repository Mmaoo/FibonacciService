import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DocumentationPage from './DocumentationPage';
import FibonacciPage from './FibonacciPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>Realizacja zadania nr 1 w ramach laboratorum PFSwChO<br /><br />
          Marcin Choina</h2>
          <div class="App-menu">
            <li><Link to="/">Fibonacci</Link></li>
            <li><Link to="/documentation">Dokumentacja</Link></li>
          </div>
        </header>
        <div class="App-content">
          <Route exact path="/" component={FibonacciPage} />
          <Route path="/documentation" component={DocumentationPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
