import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCartItems } from '../services/api';
import ItemCard from '../components/ItemCard';

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
        {productsList.length === 0 && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        <div className="container">{itemList}</div>
        <Link to="/payment">
          <button type="button" data-testid="checkout-products">
            Finalizar Compra
          </button>
        </Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
