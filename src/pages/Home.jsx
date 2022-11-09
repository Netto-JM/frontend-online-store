import React, { Component } from 'react';
import { getCategories } from '../services/api';

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

      </div>
    );
  }
}

export default Home;
