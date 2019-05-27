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
        <div className="row row-flex row-flex-wrap">
          {data.map(item => (
            <div
              key={item.id}
              className="card col-xs-12 col-sm-6 col-md-6 col-lg-4 mb-5"
            >
              <img
                src={item.principal_photo}
                alt="imagen de tour"
                className="card-img-top"
              />
              <div className="card-body">
                <h1 className="card-title">{item.name}</h1>
                <h2 className="card-text">{item.city_names}</h2>
              </div>
              <div className="card-footer border-0">
                <div className="d-flex align-items-end">
                  <div>
                    <h3 className="card-text">{item.days_and_nights}</h3>
                  </div>
                  <div>
                    <small className="text-muted">Desde:</small>
                    <h3 className="card-text">S/. {item.price}</h3>
                  </div>
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
