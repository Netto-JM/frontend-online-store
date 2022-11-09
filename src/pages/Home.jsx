import React, { Component } from 'react';
import ItemCard from '../components/ItemCard';
import * as api from '../services/api';

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
      </div>
    );
  }
}

export default Home;
