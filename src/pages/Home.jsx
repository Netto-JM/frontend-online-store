import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import * as api from '../services/api';
import SearchItem from '../components/SearchItem';
import Categories from '../components/Categories';
import '../styles/Home.css';

class Home extends Component {
  state = {
    productsList: [],
    term: '',
    initialRender: true,
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

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

  fetchCategories = async () => {
    const response = await api.getCategories();
    this.setState({ categories: response });
  };

  render() {
    const { productsList, term, initialRender, categories } = this.state;
    const itemList = productsList.map((item) => (
      <ItemCard { ...item } key={ item.id } />
    ));
    return (
      <div>
        <div className="container-header">
          <SearchItem
            term={ term }
            changeHandler={ this.changeHandler }
            clickHandler={ this.clickHandler }
          />
          <Link
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            <button
              type="button"
            >
              Carrinho de Compras
            </button>
          </Link>
        </div>

        {initialRender && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}

        <div className="container-main">
          <div className="container-menu">
            <Categories categories={ categories } />
          </div>
          <div className="container">
            {productsList.length === 0 && (
              <div className="text">
                Nenhum produto foi encontrado
              </div>
            )}
            {itemList}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
