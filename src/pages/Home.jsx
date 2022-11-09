import React, { Component } from 'react';

class Home extends Component {
  state = {
    productsList: [],
  };

  render() {
    const { productsList } = this.state;
    return (
      <div>
        <label htmlFor="Home">
          <input type="text" id="Home" />
        </label>
        {productsList.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}
      </div>
    );
  }
}

export default Home;
