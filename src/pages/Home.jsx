import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        <Link
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
      </div>
    );
  }
}

export default Home;
