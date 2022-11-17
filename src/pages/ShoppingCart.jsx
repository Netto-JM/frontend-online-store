import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCartItems, getTotal } from '../services/api';
import ItemCard from '../components/ItemCard';
import Header from '../components/Header';
import '../styles/ShoppingCart.css';

class ShoppingCart extends React.Component {
  state = {
    productsList: [],
  };

  componentDidMount() {
    this.toMountAndUpdate();
  }

  toMountAndUpdate = () => {
    const productsList = getCartItems();
    this.setState({
      productsList,
    });
  };

  render() {
    const { productsList } = this.state;

    const totalPrice = getTotal();
    const newPrice = parseFloat(totalPrice).toFixed(2).replace('.', ',');

    const itemList = productsList.map(({ id, item, quantity }) => (
      <ItemCard
        { ...item }
        key={ id }
        isShoppingCart
        quantity={ quantity }
        renderCart={ this.renderCart }
        item={ item }
        onUpdateShoppingCartItems={ this.toMountAndUpdate }
      />
    ));

    return (
      <div>
        <Header
          activeSearch={ false }
          notHome
          notShop={ false }
        />
        <div className="container-prod-final">
          {productsList.length === 0 && (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
          <h2 className="title-page-detail">Itens do carrinho</h2>
          <div className="container">{itemList}</div>
          <div className="total-price">{`Total parcial da compra: R$ ${newPrice}`}</div>
          <div className="btn-final">
            <Link to="/payment">
              <button type="button" data-testid="checkout-products">
                Finalizar Compra
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
