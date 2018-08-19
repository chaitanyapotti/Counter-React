import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CounterApp from "./CounterApp";
import Landing from "./pages/Landing";

class App extends Component {
  render() {
    return (
      <Router>
        <CounterApp>
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </CounterApp>
      </Router>
    );
  }
}

export default App;
