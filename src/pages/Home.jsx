import React, { Component } from 'react';
import ItemCard from '../components/ItemCard';
import * as api from '../services/api';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    productsList: [],
    term: '',
    initialRender: true,
  };

  clickHandler = async () => {
    const { term } = this.state;
    const result = await api.getProductsFromCategoryAndQuery(undefined, term);
    this.setState({ productsList: [], initialRender: false });
    result.results.forEach(({ thumbnail, title, price, id }) => {
      this.setState(({ productsList }) => ({
        productsList: [...productsList, { thumbnail, title, price, id }],
      }));
    });
  };

  changeHandler = ({ target: { value } }) => {
    this.setState({ term: value });
  };

  render() {
    const { productsList, term, initialRender } = this.state;

    const itemList = productsList.map((item) => (
      <ItemCard { ...item } key={ item.id } />
    ));

    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const response = await api.getCategories();
    this.setState({ categories: response });
  };

  render() {
    const { productsList, categories } = this.state;
    return (
      <div>
        <label htmlFor="Home">
          <input
            type="text"
            id="Home"
            data-testid="query-input"
            value={ term }
            onChange={ this.changeHandler }
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.clickHandler }
        >
          Buscar
        </button>
        {initialRender && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        {productsList.length === 0 && (
          <p data-testid="home-initial-message">
            Nenhum produto foi encontrado
          </p>
        )}
        {itemList}
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
