import React from 'react';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom'
import AddCar from './components/VendorComponents/AddCar/AddCar'
import './App.css';

const INIT_STATE = {
  uploaded: false
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Redirect from="/" to="/AddCar" />
          <Route path="/AddCar" exact component={(props) => <AddCar {...props} />} />
        </div>
      </Router>
  );
  }
}

export default App;
