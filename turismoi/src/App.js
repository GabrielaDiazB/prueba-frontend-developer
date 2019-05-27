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
    const data = Object.values(items)[0];
    if (!isLoaded) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
          {data.map(item => (
            <div key={item.id}>
              <img src={item.principal_photo} alt="imagen de tour" />
              <div>
                <h1>{item.name}</h1>
                <h2>{item.city_names}</h2>
                <div>
                  <h3>{item.days_and_nights}</h3>
                  <small>Desde:</small>
                  <h3>S/. {item.price}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default App;
