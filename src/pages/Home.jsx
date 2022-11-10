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
    categories: [],
    initialMsg: 'Digite algum termo de pesquisa ou escolha uma categoria.',
  };

  componentDidMount() {
    this.fetchCategories();
  }

  clickHandler = async () => {
    const { term } = this.state;
    const { results } = await api.getProductsFromCategoryAndQuery(undefined, term);
    const productsList = results.map(({ thumbnail, title, price, id }) => ({
      thumbnail, title, price, id,
    }));
    const initialMsg = productsList.length === 0 ? 'Nenhum produto foi encontrado' : '';
    this.setState({ productsList, initialMsg });
  };

  clickHandlerCategories = async (idCategories) => {
    const { results } = await api.getProductsFromCategoryAndQuery(idCategories);
    this.setState({ productsList: [] });
    const productsList = results.map(({ thumbnail, title, price, id }) => ({
      thumbnail, title, price, id,
    }));
    const initialMsg = productsList.length === 0 ? 'Nenhum produto foi encontrado' : '';
    this.setState({ productsList, initialMsg });
    console.log(idCategories);
  };

  changeHandler = ({ target: { value } }) => {
    this.setState({ term: value });
  };

  fetchCategories = async () => {
    const response = await api.getCategories();
    this.setState({ categories: response });
  };

  render() {
    const { productsList, term, categories, initialMsg } = this.state;
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
              {/* oi */}
            </button>
          </Link>
        </div>

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
