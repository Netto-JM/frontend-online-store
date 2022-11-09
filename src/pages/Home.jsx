import React, { Component } from 'react';
import { getCategories } from '../services/api';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    productsList: [],
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const response = await getCategories();
    this.setState({ categories: response });
  };

  render() {
    const { productsList, categories } = this.state;
    return (
      <div>
        <label htmlFor="Home">
          <input type="text" id="Home" />
        </label>
        {productsList.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}

        {categories.map((category) => (
          <button
            type="button"
            key={ category.id }
            data-testid="category"
            onClick={ () => this.getProductsFromCategoryAndQuery(category.id) }
          >
            {category.name}
          </button>
        ))}

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
