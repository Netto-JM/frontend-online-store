import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCartItems, getTotalQuantity } from '../services/api';
import ItemCard from '../components/ItemCard';

class ShoppingCart extends React.Component {
  state = {
    productsList: [],
    totalQuantity: 0, // estado que guarda a quantidade de itens
  };

  componentDidMount() {
    this.toMountAndUpdate();
  }

  toMountAndUpdate = () => {
    const productsList = getCartItems();
    // const totalQuantity = productsList.length; para totais de itens únicos
    const totalQuantity = getTotalQuantity(); // para total de itens mesmo repetidos
    this.setState({
      productsList,
      totalQuantity,
    });
  };

  render() {
    const { productsList, totalQuantity } = this.state;

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
          <span data-testid="shopping-cart-size">{totalQuantity}</span>
          {/* E aqui tentei exibir o total, está funcionando, mas o teste que analisa essa página não passa */}
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
