import React, { Component } from 'react';
import ItemCard from '../components/ItemCard';
import * as api from '../services/api';
import Categories from '../components/Categories';
import Header from '../components/Header';
import { getTotalQuantity } from '../services/api';

import '../styles/Home.css';

class Home extends Component {
  state = {
    productsList: [],
    term: '',
    categories: [],
    initialMsg: 'Digite algum termo de pesquisa ou escolha uma categoria.',
    totalQuantity: 0,
  };

  componentDidMount() {
    this.fetchCategories();
    const totalQuantity = getTotalQuantity();
    this.setState({ totalQuantity });
  }

  clickHandler = async () => {
    const { term } = this.state;
    const { results } = await api.getProductsFromCategoryAndQuery(undefined, term);
    const productsList = results;
    const initialMsg = productsList.length === 0 ? 'Nenhum produto foi encontrado' : '';
    this.setState({ productsList, initialMsg });
  };

  clickHandlerCategories = async (idCategories) => {
    const { results } = await api.getProductsFromCategoryAndQuery(idCategories);
    console.log(results[0]);
    const productsList = results.map(
      ({ thumbnail,
        title,
        price,
        id,
        available_quantity: availableQuantity,
        shipping: { free_shipping: freeShipping },
      }) => ({
        thumbnail,
        title,
        price,
        id,
        availableQuantity, // renomeação necessária por causa do camelCase
        freeShipping,
      }),
    );
    const initialMsg = productsList.length === 0 ? 'Nenhum produto foi encontrado' : '';
    this.setState({ productsList, initialMsg });
  };

  changeHandler = ({ target: { value } }) => {
    this.setState({ term: value });
  };

  fetchCategories = async () => {
    const response = await api.getCategories();
    this.setState({ categories: response });
  };

  onUpdateShoppingCartItems = () => {
    const totalQuantity = getTotalQuantity();
    this.setState({ totalQuantity });
  };

  render() {
    const { productsList, categories, term, initialMsg, totalQuantity } = this.state;
    const itemList = productsList.map((item) => (
      <ItemCard
        { ...item }
        item={ item }
        key={ item.id }
        onUpdateShoppingCartItems={ this.onUpdateShoppingCartItems }
      />
    ));
    return (
      <div>
        <Header
          term={ term }
          changeHandler={ this.changeHandler }
          clickHandler={ this.clickHandler }
          totalQuantity={ totalQuantity }
          activeSearch
        />

        <div className="container-main">
          <div className="container-menu">
            <Categories
              categories={ categories }
              clickHandlerCategories={ this.clickHandlerCategories }
            />
          </div>
          <div className="container">
            <p data-testid="home-initial-message">{initialMsg}</p>
            {itemList}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
