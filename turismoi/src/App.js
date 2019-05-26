import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(tours) {
    super(tours);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    const myHeaders = new Headers({
      'Content-Type': 'aplication/json',
      Authorization: 'Token token=f2b15a0105d45'
    });
    fetch('https://turismoi.pe/api/v1/packages.json', {
      method: 'GET',
      headers: myHeaders
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  render() {
    const { isLoaded, items } = this.state;
    console.log(items);
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div>Cargó</div>;
    }
  }
}
export default App;
