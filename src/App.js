import React from 'react';
import './App.css';
import Account from './account';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Account} />
        </Switch>
      </Router>
    );
  }
}

export default App;
