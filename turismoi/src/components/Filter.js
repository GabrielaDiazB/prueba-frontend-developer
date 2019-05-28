import React, { Component } from 'react';

class Filter extends Component {
  constructor(tours) {
    super(tours);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  setItemsStateOnProps() {
    const myHeaders = new Headers({
      'Content-Type': 'aplication/json',
      Authorization: 'Token token=f2b15a0105d45'
    });
    fetch('https://turismoi.pe/api/v1/regions.json?only_with_packages=1', {
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
          <select name="filterRegion">
            {data.map(item => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </>
      );
    }
  }
}

export default Filter;
