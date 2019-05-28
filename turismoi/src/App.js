import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(tours) {
    super(tours);
    this.toggleSortPriceAsc = this.toggleSortPriceAsc.bind(this);
    this.toggleSortPriceDesc = this.toggleSortPriceDesc.bind(this);
    this.toggleSortDaysAsc = this.toggleSortDaysAsc.bind(this);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  toggleSortPriceAsc(event) {
    const { items } = this.state;
    const data = Object.values(items)[0];
    let newItems = data;
    this.setState({
      data: newItems.sort((a, b) => (a.price > b.price ? 1 : -1))
    });
  }

  toggleSortPriceDesc(event) {
    const { items } = this.state;
    const data = Object.values(items)[0];
    let newItems = data;
    this.setState({
      data: newItems.sort((a, b) => (a.price > b.price ? -1 : 1))
    });
  }

  toggleSortDaysAsc(event) {
    const { items } = this.state;
    const data = Object.values(items)[0];
    let newItems = data;
    this.setState({
      data: newItems.sort((a, b) =>
        a.days_and_nights > b.days_and_nights ? 1 : -1
      )
    });
  }

  toggleSortDaysDesc(event) {
    const { items } = this.state;
    const data = Object.values(items)[0];
    let newItems = data;
    this.setState({
      data: newItems.sort((a, b) =>
        a.days_and_nights > b.days_and_nights ? -1 : 1
      )
    });
  }

  selectOrder(orderType) {
    if (orderType === 'priceAsc') {
      this.toggleSortPriceAsc();
    } else if (orderType === 'priceDesc') {
      this.toggleSortPriceDesc();
    } else if (orderType === 'daysAsc') {
      this.toggleSortDaysAsc();
    } else if (orderType === 'daysDesc') {
      this.toggleSortDaysDesc();
    }
  }

  setItemsStateOnProps() {
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

  componentDidUpdate(prevProps, prevState, snapshop) {
    if (this.props !== prevProps) {
      this.setItemsStateOnProps();
    }
  }

  componentDidMount() {
    this.setItemsStateOnProps();
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
        <>
          <h1>Tours y Actividades Perú</h1>
          <div>
            <select
              name="order"
              onChange={orderType => this.selectOrder(orderType.target.value)}
            >
              <option value="option">Ordenar por...</option>
              <option value="priceAsc">Los de menor precio primero</option>
              <option value="priceDesc">Los de mayor precio primero</option>
              <option value="daysAsc">Los de menos días primero</option>
              <option value="daysDesc">Los de más días primero</option>
            </select>
          </div>
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
        </>
      );
    }
  }
}

export default App;
