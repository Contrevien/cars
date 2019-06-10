import React from 'react';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom'
import AddCar from './components/VendorComponents/AddCar/AddCar'
import './App.css';
import PreviewCar from './components/PreviewCar/PreviewCar';

const INIT_STATE = {
  uploaded: false,
  data: {
    images: [],
    _360: "",
    carDetails: {}
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }


  // 432JntST7H2EfxH7YHn4bcbJ
  submit = (obj) => {
    this.setState({
      data: obj,
      uploaded: true
    })
  }


  componentDidMount() {
    // fetch("https://api.remove.bg/v1.0/removebg", {
    //       method: "POST",
    //       headers: {
    //         'X-Api-Key': '432JntST7H2EfxH7YHn4bcbJ'
    //       },
    //       encoding: null,
    //       formData: {
    //         image_url: "https://i.imgur.com/VoGw5Iu.jpg",
    //         size: "auto"
    //       }
    //     })
    //       .then(res => res.json())
    //       .then(res => console.log(res))

  }

  render() {
    return (
      <Router>
        <div className="App">
          <Redirect from="/" to="/AddCar" />
          {this.state.uploaded && <Redirect to="/PreviewCar" />}
          <Route path="/AddCar" exact component={(props) => <AddCar {...props} submit={this.submit} />} />
          <Route path="/PreviewCar" exact component={(props) => <PreviewCar {...props} data={this.state.data} />} />
        </div>
      </Router>
  );
  }
}

export default App;
